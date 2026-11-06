import { useState, useEffect, useMemo } from 'react';
import {
  Save,
  Search,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  RefreshCw,
  ShoppingBag,
  ShieldCheck,
  Tag,
  Layers,
  Copy,
  LayoutDashboard,
  Package,
  BadgePercent,
  CheckCircle,
  XCircle,
  Sparkles,
  Percent,
  Globe,
  Menu,
  X,
  Boxes,
  Edit3,
  Pencil,
  Plus,
  Trash2,
  SlidersHorizontal,
  Upload,
} from 'lucide-react';
import { getStoreProducts, type StoreProduct } from '@/lib/productsData';
import {
  fetchLivePrices,
  saveLivePrice,
  saveNewProduct,
  applyLivePrices,
  getLocalCachedPrices,
  getProductKey,
  type CustomPriceRecord,
  type ProductOffer,
} from '@/lib/priceStore';
import { logoutAdmin, ADMIN_EMAIL } from './AdminLoginModal';
import { isSupabaseConfigured } from '@/lib/supabase';
import { getAssetUrl } from '@/lib/utils';
import { useLanguage } from '@/lib/languageContext';
import LanguageSwitcher from './ui/LanguageSwitcher';

interface AdminDashboardProps {
  onBackToHome: () => void;
  onNavigateStore: () => void;
}

interface EditablePriceState {
  basePrice: number;
  variants: string[];
  variantPrices: Record<string, number>;
  inStock: boolean;
  variantStock: Record<string, boolean>;
  offer: ProductOffer;
  variantOffers: Record<string, ProductOffer>;
}

type AdminTab = 'dashboard' | 'products' | 'offers';

const PRESET_IMAGES = [
  { label: 'Sarki Pend', url: '/sarkhi.png' },
  { label: 'MilkMax', url: '/milk1.png' },
  { label: 'NavMin', url: '/navmin.png' },
  { label: 'GrowMax', url: '/growmax.png' },
  { label: 'HeatMax', url: '/heatmax.png' },
  { label: 'FatMax', url: '/fatmax.png' },
  { label: 'Mast Guard', url: '/mastguard.png' },
  { label: 'Garbha Care', url: '/garbhaCare.png' },
  { label: 'Makka Sailage', url: '/Makka_Sailage.png' },
];

const PRESET_CATEGORIES = [
  'Cattle Feed',
  'Calcium Supplement',
  'Chelated Minerals',
  'Milk Fat Booster',
  'Calf Growth',
  'Reproductive Support',
  'Pregnancy Care',
  'Udder Care',
  'Fermented Silage',
  'General Care',
];

export default function AdminDashboard({ onBackToHome, onNavigateStore }: AdminDashboardProps) {
  const { language } = useLanguage();

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const [customPrices, setCustomPrices] = useState<Record<string, CustomPriceRecord>>(() =>
    getLocalCachedPrices()
  );

  // Dynamic products list combining static definitions and custom created products with live prices
  const products = useMemo<StoreProduct[]>(() => {
    const base = getStoreProducts(language);
    return applyLivePrices(base, customPrices);
  }, [language, customPrices]);

  const [editedStates, setEditedStates] = useState<Record<string, EditablePriceState>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [savedSuccessKey, setSavedSuccessKey] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<string>('Checking sync...');
  const [rlsError, setRlsError] = useState<string | null>(null);
  const [sqlCopied, setSqlCopied] = useState(false);

  // Selected variant tab in Offer Management per product: { [productKey]: selectedVariantName }
  const [activeOfferVariantMap, setActiveOfferVariantMap] = useState<Record<string, string>>({});

  // Modal State for Variant, Pricing, Stock & Product Details Editing
  const [editingProduct, setEditingProduct] = useState<StoreProduct | null>(null);
  const [editProdName, setEditProdName] = useState<string>('');
  const [editProdSubtitle, setEditProdSubtitle] = useState<string>('');
  const [editProdDescription, setEditProdDescription] = useState<string>('');
  const [editProdCategory, setEditProdCategory] = useState<string>('');
  const [editProdImage, setEditProdImage] = useState<string>('');
  const [modalVariants, setModalVariants] = useState<string[]>([]);
  const [modalPrices, setModalPrices] = useState<Record<string, number>>({});
  const [modalStock, setModalStock] = useState<Record<string, boolean>>({});
  const [modalMasterInStock, setModalMasterInStock] = useState<boolean>(true);
  const [newVariantName, setNewVariantName] = useState<string>('');
  const [newVariantPrice, setNewVariantPrice] = useState<string>('');
  const [newVariantError, setNewVariantError] = useState<string | null>(null);
  const [modalIsSaving, setModalIsSaving] = useState<boolean>(false);
  const [modalSaveSuccess, setModalSaveSuccess] = useState<boolean>(false);

  // Modal State for Add New Product
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdSubtitle, setNewProdSubtitle] = useState('');
  const [newProdCategory, setNewProdCategory] = useState(PRESET_CATEGORIES[0]);
  const [newProdImage, setNewProdImage] = useState('/sarkhi.png');
  const [newProdVariants, setNewProdVariants] = useState<Array<{ size: string; price: string }>>([
    { size: '1 kg', price: '' },
  ]);
  const [newProdInStock, setNewProdInStock] = useState(true);
  const [newProdError, setNewProdError] = useState<string | null>(null);
  const [isSavingNewProduct, setIsSavingNewProduct] = useState(false);
  const [newProductSuccess, setNewProductSuccess] = useState(false);

  // Initialize editable prices cross-language (using index matching)
  useEffect(() => {
    const initial: Record<string, EditablePriceState> = {};
    products.forEach((prod) => {
      const key = getProductKey(prod);
      const custom = customPrices[key] || customPrices[prod.name];
      const variantPrices: Record<string, number> = {};
      const variantStock: Record<string, boolean> = {};
      const variantOffers: Record<string, ProductOffer> = {};

      // Combine base variants with any custom-added variants
      const allVariants = [...prod.variants];
      if (custom?.variants && Array.isArray(custom.variants)) {
        custom.variants.forEach((cv) => {
          if (!allVariants.includes(cv) && !cv.startsWith('idx_')) {
            allVariants.push(cv);
          }
        });
      }

      allVariants.forEach((vName, idx) => {
        // Prices
        const customVal =
          custom?.variantPrices?.[vName] ??
          custom?.variantPrices?.[`idx_${idx}`] ??
          prod.variantPrices?.[vName] ??
          (custom ? custom.basePrice : prod.price);
        variantPrices[vName] = customVal;

        // Variant Stock
        const stockVal =
          custom?.variantStock?.[vName] ??
          custom?.variantStock?.[`idx_${idx}`] ??
          true;
        variantStock[vName] = stockVal;

        // Variant Offers
        const vOffer =
          custom?.variantOffers?.[vName] ??
          custom?.variantOffers?.[`idx_${idx}`] ?? {
            enabled: false,
            discountPercent: 10,
            badgeText: language === 'mr' ? '१०% सवलत' : language === 'hi' ? '१०% छूट' : '10% OFF',
          };
        variantOffers[vName] = vOffer;
      });

      initial[key] = {
        basePrice: custom ? custom.basePrice : prod.price,
        variants: allVariants,
        variantPrices,
        inStock: custom?.inStock !== false, // default true
        variantStock,
        offer: custom?.offer || {
          enabled: false,
          discountPercent: 10,
          badgeText: language === 'mr' ? '१०% सवलत' : language === 'hi' ? '१०% छूट' : '10% OFF',
        },
        variantOffers,
      };
    });
    setEditedStates(initial);
  }, [products, customPrices, language]);

  // Load from Supabase on mount
  useEffect(() => {
    fetchLivePrices()
      .then((live) => {
        setCustomPrices(live);
        setSyncStatus(isSupabaseConfigured ? 'Supabase Live Connected' : 'Local Storage Mode');
      })
      .catch(() => {
        setSyncStatus('Local Cache Mode');
      });

    const onPricesUpdated = () => {
      setCustomPrices(getLocalCachedPrices());
    };
    window.addEventListener('navbharat_prices_updated', onPricesUpdated);
    return () => window.removeEventListener('navbharat_prices_updated', onPricesUpdated);
  }, []);

  // Filter products by search
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [products, searchQuery]);

  // Metric Computations for Dashboard
  const metrics = useMemo(() => {
    const total = products.length;
    let inStockCount = 0;
    let outOfStockCount = 0;
    let activeOffersCount = 0;
    let customizedPricesCount = 0;

    products.forEach((prod) => {
      const key = getProductKey(prod);
      const state = editedStates[key];
      const custom = customPrices[key];

      if (state?.inStock !== false) {
        inStockCount++;
      } else {
        outOfStockCount++;
      }

      // Check if any variant offer is active or master offer is active
      const hasAnyVariantOffer = Object.values(state?.variantOffers || {}).some(
        (vo) => vo.enabled
      );
      if (hasAnyVariantOffer || state?.offer?.enabled) {
        activeOffersCount++;
      }

      if (custom) {
        customizedPricesCount++;
      }
    });

    const uniqueCategories = new Set(products.map((p) => p.category));

    return {
      total,
      inStockCount,
      outOfStockCount,
      activeOffersCount,
      customizedPricesCount,
      categoryCount: uniqueCategories.size,
    };
  }, [products, editedStates, customPrices]);

  // Open Edit Modal for an Existing Product
  const handleOpenEditModal = (product: StoreProduct) => {
    const key = getProductKey(product);
    const state = editedStates[key];
    const custom = customPrices[key];

    // Combine base variants with custom variants
    const variantsList = state?.variants ? [...state.variants] : [...product.variants];
    if (custom?.variants && Array.isArray(custom.variants)) {
      custom.variants.forEach((cv) => {
        if (!variantsList.includes(cv) && !cv.startsWith('idx_')) {
          variantsList.push(cv);
        }
      });
    }

    const pricesMap: Record<string, number> = { ...(state?.variantPrices || {}) };
    const stockMap: Record<string, boolean> = { ...(state?.variantStock || {}) };

    variantsList.forEach((v, idx) => {
      if (pricesMap[v] === undefined) {
        pricesMap[v] =
          custom?.variantPrices?.[v] ??
          custom?.variantPrices?.[`idx_${idx}`] ??
          product.variantPrices?.[v] ??
          product.price;
      }
      if (stockMap[v] === undefined) {
        stockMap[v] =
          custom?.variantStock?.[v] ??
          custom?.variantStock?.[`idx_${idx}`] ??
          true;
      }
    });

    setEditingProduct(product);
    setEditProdName(custom?.name || product.name);
    setEditProdSubtitle(custom?.subtitle || product.subtitle || '');
    setEditProdDescription(custom?.description || product.description || product.subtitle || '');
    setEditProdCategory(custom?.category || product.category || PRESET_CATEGORIES[0]);
    setEditProdImage(custom?.image || product.image || '/sarkhi.png');
    setModalVariants(variantsList);
    setModalPrices(pricesMap);
    setModalStock(stockMap);
    setModalMasterInStock(state?.inStock !== false);
    setNewVariantName('');
    setNewVariantPrice('');
    setNewVariantError(null);
    setModalSaveSuccess(false);
  };

  // Add New Packaging Variant inside Edit Modal
  const handleAddNewVariant = () => {
    const trimmedName = newVariantName.trim();
    const priceNum = parseFloat(newVariantPrice.trim());

    if (!trimmedName) {
      setNewVariantError(
        language === 'mr'
          ? 'कृपया पॅकिंग साईजचे नाव लिहा (उदा. 10 kg, 12 kg)'
          : language === 'hi'
          ? 'कृपया पैकेजिंग साइज़ का नाम लिखें (उदा. 10 kg, 12 kg)'
          : 'Please enter a variant size name (e.g. 10 kg, 12 kg)'
      );
      return;
    }

    if (modalVariants.includes(trimmedName)) {
      setNewVariantError(
        language === 'mr'
          ? 'हा व्हॅरिएंट आधीच सूचीमध्ये उपलब्ध आहे!'
          : language === 'hi'
          ? 'यह वैरिएंट पहले से सूची में मौजूद है!'
          : 'This variant size is already in the list!'
      );
      return;
    }

    if (isNaN(priceNum) || priceNum <= 0) {
      setNewVariantError(
        language === 'mr'
          ? 'कृपया योग्य किंमत प्रविष्ट करा (₹)'
          : language === 'hi'
          ? 'कृपया मान्य कीमत दर्ज करें (₹)'
          : 'Please enter a valid rate in ₹'
      );
      return;
    }

    setModalVariants((prev) => [...prev, trimmedName]);
    setModalPrices((prev) => ({ ...prev, [trimmedName]: priceNum }));
    setModalStock((prev) => ({ ...prev, [trimmedName]: true }));
    setNewVariantName('');
    setNewVariantPrice('');
    setNewVariantError(null);
  };

  // Remove Variant inside Edit Modal
  const handleDeleteVariant = (variantName: string) => {
    setModalVariants((prev) => prev.filter((v) => v !== variantName));
    setModalPrices((prev) => {
      const copy = { ...prev };
      delete copy[variantName];
      return copy;
    });
    setModalStock((prev) => {
      const copy = { ...prev };
      delete copy[variantName];
      return copy;
    });
  };

  // Toggle Variant Stock inside Edit Modal
  const handleModalVariantStockToggle = (variantName: string) => {
    setModalStock((prev) => ({
      ...prev,
      [variantName]: prev[variantName] === false ? true : false,
    }));
  };

  // Update Variant Price inside Edit Modal
  const handleModalPriceChange = (variantName: string, newPrice: number) => {
    setModalPrices((prev) => ({
      ...prev,
      [variantName]: isNaN(newPrice) ? 0 : newPrice,
    }));
  };

  // Image upload handler for Edit Modal
  const handleEditImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setEditProdImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Save changes from Edit Modal
  const handleModalSave = async () => {
    if (!editingProduct) return;
    const key = getProductKey(editingProduct);
    const currentState = editedStates[key];

    setModalIsSaving(true);
    setRlsError(null);

    const firstVariant = modalVariants[0];
    const derivedBasePrice =
      firstVariant && modalPrices[firstVariant]
        ? modalPrices[firstVariant]
        : (currentState?.basePrice ?? editingProduct.price);

    const trimmedEditName = editProdName.trim() || editingProduct.name;
    const extraMeta = {
      image: editProdImage,
      subtitle: editProdSubtitle.trim(),
      description: editProdDescription.trim(),
      category: editProdCategory.trim(),
    };

    try {
      const res = await saveLivePrice(
        key,
        trimmedEditName,
        derivedBasePrice,
        modalPrices,
        modalVariants,
        modalMasterInStock,
        modalStock,
        currentState?.offer,
        currentState?.variantOffers,
        extraMeta
      );

      if (!res.success) {
        setRlsError(
          res.error || 'Row Level Security (RLS) is preventing changes from saving to Supabase.'
        );
      } else {
        setRlsError(null);
        setCustomPrices((prev) => ({
          ...prev,
          [key]: {
            id: key,
            name: trimmedEditName,
            image: editProdImage,
            subtitle: editProdSubtitle.trim(),
            description: editProdDescription.trim(),
            category: editProdCategory.trim(),
            basePrice: derivedBasePrice,
            variants: modalVariants,
            variantPrices: modalPrices,
            inStock: modalMasterInStock,
            variantStock: modalStock,
            offer: currentState?.offer,
            variantOffers: currentState?.variantOffers,
            updatedAt: new Date().toISOString(),
          },
        }));

        setEditedStates((prev) => ({
          ...prev,
          [key]: {
            ...prev[key],
            basePrice: derivedBasePrice,
            variants: modalVariants,
            variantPrices: modalPrices,
            inStock: modalMasterInStock,
            variantStock: modalStock,
          },
        }));

        setModalSaveSuccess(true);
        setTimeout(() => {
          setModalSaveSuccess(false);
          setEditingProduct(null);
        }, 1200);
      }
    } catch (err: any) {
      console.error('Modal save failed:', err);
      setRlsError(err.message || 'Error saving variants in database');
    } finally {
      setModalIsSaving(false);
    }
  };

  // -----------------------------------------------------------------
  // ADD NEW PRODUCT LOGIC
  // -----------------------------------------------------------------
  const handleAddVariantRow = () => {
    setNewProdVariants((prev) => [...prev, { size: '', price: '' }]);
  };

  const handleUpdateVariantRow = (index: number, field: 'size' | 'price', value: string) => {
    setNewProdVariants((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleRemoveVariantRow = (index: number) => {
    if (newProdVariants.length <= 1) return;
    setNewProdVariants((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setNewProdImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveNewProduct = async () => {
    const trimmedName = newProdName.trim();
    if (!trimmedName) {
      setNewProdError(
        language === 'mr'
          ? 'कृपया उत्पादनाचे नाव प्रविष्ट करा.'
          : language === 'hi'
          ? 'कृपया उत्पाद का नाम दर्ज करें।'
          : 'Please enter a product name.'
      );
      return;
    }

    const validVariants = newProdVariants.filter(
      (v) => v.size.trim() && !isNaN(parseFloat(v.price)) && parseFloat(v.price) > 0
    );

    if (validVariants.length === 0) {
      setNewProdError(
        language === 'mr'
          ? 'किमान १ व्हॅरिएंट साईज आणि योग्य किंमत (₹) प्रविष्ट करा.'
          : language === 'hi'
          ? 'कम से कम १ वैरिएंट साइज़ और वैध कीमत (₹) दर्ज करें।'
          : 'Please enter at least one variant size with a valid price in ₹.'
      );
      return;
    }

    setIsSavingNewProduct(true);
    setNewProdError(null);

    const variantsList = validVariants.map((v) => v.size.trim());
    const variantPricesMap: Record<string, number> = {};
    const variantStockMap: Record<string, boolean> = {};

    validVariants.forEach((v) => {
      const priceNum = parseFloat(v.price);
      variantPricesMap[v.size.trim()] = priceNum;
      variantStockMap[v.size.trim()] = true;
    });

    const firstPrice = parseFloat(validVariants[0].price);

    const createdProduct: StoreProduct = {
      name: trimmedName,
      subtitle: newProdSubtitle.trim() || `${newProdCategory} for Dairy Animals`,
      category: newProdCategory,
      description: `${trimmedName} is specially formulated by Navbharat Agro to deliver premium nutrition and superior health for dairy herds.`,
      idealFor: '🐄 Dairy Livestock • Cows & Buffaloes',
      form: 'Concentrate Feed & Supplement',
      packaging: variantsList.join(' | '),
      variants: variantsList,
      variantPrices: variantPricesMap,
      price: firstPrice,
      image: newProdImage || '/sarkhi.png',
      rating: 4.9,
      reviewCount: 1,
      highlights: [
        'Formulated with high quality nutritional ingredients',
        'Helps optimize dairy productivity and animal well-being',
        'Direct farm delivery in secure packaging',
      ],
      usage: 'Follow instructions on pack or consult livestock nutritionist.',
      inStock: newProdInStock,
      variantStock: variantStockMap,
    };

    try {
      const res = await saveNewProduct(createdProduct);
      if (!res.success) {
        setRlsError(res.error || 'Failed to save new product in database');
      } else {
        setNewProductSuccess(true);
        setTimeout(() => {
          setNewProductSuccess(false);
          setIsAddProductModalOpen(false);
          // Reset form
          setNewProdName('');
          setNewProdSubtitle('');
          setNewProdCategory(PRESET_CATEGORIES[0]);
          setNewProdImage('/sarkhi.png');
          setNewProdVariants([{ size: '1 kg', price: '' }]);
          setNewProdInStock(true);
        }, 1200);
      }
    } catch (err: any) {
      setNewProdError(err.message || 'Error creating product');
    } finally {
      setIsSavingNewProduct(false);
    }
  };

  // -----------------------------------------------------------------
  // INDIVIDUAL VARIANT OFFER HANDLERS
  // -----------------------------------------------------------------
  const handleVariantOfferToggle = (productKey: string, variantName: string) => {
    setEditedStates((prev) => {
      const currentOffers = prev[productKey]?.variantOffers || {};
      const existing = currentOffers[variantName] || {
        enabled: false,
        discountPercent: 10,
        badgeText: 'Special Deal',
      };
      return {
        ...prev,
        [productKey]: {
          ...prev[productKey],
          variantOffers: {
            ...currentOffers,
            [variantName]: {
              ...existing,
              enabled: !existing.enabled,
            },
          },
        },
      };
    });
  };

  const handleVariantOfferDiscountChange = (
    productKey: string,
    variantName: string,
    percent: number
  ) => {
    setEditedStates((prev) => {
      const currentOffers = prev[productKey]?.variantOffers || {};
      const existing = currentOffers[variantName] || {
        enabled: true,
        discountPercent: 10,
        badgeText: 'Special Deal',
      };
      return {
        ...prev,
        [productKey]: {
          ...prev[productKey],
          variantOffers: {
            ...currentOffers,
            [variantName]: {
              ...existing,
              discountPercent: isNaN(percent) ? 0 : percent,
            },
          },
        },
      };
    });
  };

  const handleVariantOfferBadgeChange = (
    productKey: string,
    variantName: string,
    badgeText: string
  ) => {
    setEditedStates((prev) => {
      const currentOffers = prev[productKey]?.variantOffers || {};
      const existing = currentOffers[variantName] || {
        enabled: true,
        discountPercent: 10,
        badgeText: '',
      };
      return {
        ...prev,
        [productKey]: {
          ...prev[productKey],
          variantOffers: {
            ...currentOffers,
            [variantName]: {
              ...existing,
              badgeText,
            },
          },
        },
      };
    });
  };

  const handleApplyDiscountToAllVariants = (
    productKey: string,
    percent: number,
    badgeText: string
  ) => {
    setEditedStates((prev) => {
      const product = products.find((p) => getProductKey(p) === productKey);
      const variants = prev[productKey]?.variants || product?.variants || [];
      const updatedOffers: Record<string, ProductOffer> = {};

      variants.forEach((v) => {
        updatedOffers[v] = {
          enabled: true,
          discountPercent: percent,
          badgeText: badgeText || `${percent}% OFF`,
        };
      });

      return {
        ...prev,
        [productKey]: {
          ...prev[productKey],
          variantOffers: updatedOffers,
          offer: {
            enabled: true,
            discountPercent: percent,
            badgeText: badgeText || `${percent}% OFF`,
          },
        },
      };
    });
  };

  const handleSaveOffer = async (product: StoreProduct) => {
    const key = getProductKey(product);
    const edit = editedStates[key];
    if (!edit) return;

    setSavingKey(key);
    setRlsError(null);

    const currentVariants = edit.variants || product.variants || [];
    const firstVariant = currentVariants[0];
    const primaryOffer = firstVariant ? edit.variantOffers[firstVariant] : edit.offer;

    try {
      const res = await saveLivePrice(
        key,
        product.name,
        edit.basePrice,
        edit.variantPrices,
        currentVariants,
        edit.inStock,
        edit.variantStock,
        primaryOffer || edit.offer,
        edit.variantOffers
      );

      if (!res.success) {
        setRlsError(
          res.error || 'Row Level Security (RLS) is preventing changes from saving to Supabase.'
        );
      } else {
        setRlsError(null);
        setCustomPrices((prev) => ({
          ...prev,
          [key]: {
            id: key,
            basePrice: edit.basePrice,
            variants: currentVariants,
            variantPrices: edit.variantPrices,
            inStock: edit.inStock,
            variantStock: edit.variantStock,
            offer: primaryOffer || edit.offer,
            variantOffers: edit.variantOffers,
            updatedAt: new Date().toISOString(),
          },
        }));
        setSavedSuccessKey(key);
        setTimeout(() => {
          setSavedSuccessKey(null);
        }, 2500);
      }
    } catch (err: any) {
      console.error('Save failed:', err);
      setRlsError(err.message || 'Error updating price in Supabase');
    } finally {
      setSavingKey(null);
    }
  };

  const handleCopySql = () => {
    const sql = 'alter table product_prices disable row level security;';
    navigator.clipboard.writeText(sql);
    setSqlCopied(true);
    setTimeout(() => setSqlCopied(false), 3000);
  };

  const handleLogout = () => {
    logoutAdmin();
    onBackToHome();
  };

  return (
    <div className="min-h-screen bg-[#F4F9F4] text-gray-900 font-sans flex flex-col md:flex-row">
      {/* ------------------------------------------------------------- */}
      {/* SIDEBAR NAVIGATION */}
      {/* ------------------------------------------------------------- */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-[#123814] text-white flex flex-col justify-between z-50 transition-transform duration-300 shadow-2xl ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Top: Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={getAssetUrl('/Whitte Circle logo(3).png')}
              alt="Logo"
              className="w-10 h-10 object-contain rounded-full bg-white p-0.5 shadow-sm"
            />
            <div>
              <h2 className="font-extrabold text-base tracking-tight text-white leading-tight">
                Navbharat Agro
              </h2>
              <span className="text-[10px] font-bold text-emerald-300 bg-white/10 px-2 py-0.5 rounded-full inline-block mt-0.5">
                Admin Console
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="md:hidden text-white/70 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Center: Navigation Options */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {/* Option 1: Dashboard */}
          <button
            onClick={() => {
              setActiveTab('dashboard');
              setIsMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-[#E86A10] text-white shadow-lg shadow-orange-950/30 font-black scale-[1.02]'
                : 'text-emerald-100/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-5 h-5 shrink-0" />
            <span>
              {language === 'mr' ? 'डॅशबोर्ड (Dashboard)' : language === 'hi' ? 'डैशबोर्ड (Dashboard)' : 'Dashboard'}
            </span>
          </button>

          {/* Option 2: Product Management */}
          <button
            onClick={() => {
              setActiveTab('products');
              setIsMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'bg-[#E86A10] text-white shadow-lg shadow-orange-950/30 font-black scale-[1.02]'
                : 'text-emerald-100/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Boxes className="w-5 h-5 shrink-0" />
            <span>
              {language === 'mr'
                ? 'उत्पादन व्यवस्थापन (Products)'
                : language === 'hi'
                ? 'उत्पाद प्रबंधन (Products)'
                : 'Product Management'}
            </span>
          </button>

          {/* Option 3: Offer Management */}
          <button
            onClick={() => {
              setActiveTab('offers');
              setIsMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'offers'
                ? 'bg-[#E86A10] text-white shadow-lg shadow-orange-950/30 font-black scale-[1.02]'
                : 'text-emerald-100/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            <BadgePercent className="w-5 h-5 shrink-0" />
            <span>
              {language === 'mr'
                ? 'ऑफर व्यवस्थापन (Offers)'
                : language === 'hi'
                ? 'ऑफर प्रबंधन (Offers)'
                : 'Offer Management'}
            </span>
          </button>

          {/* Divider */}
          <div className="pt-4 pb-2 border-t border-white/10 my-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300/60 px-4">
              Quick Links
            </span>
          </div>

          {/* External: View Website */}
          <button
            onClick={onBackToHome}
            className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-2xl text-xs font-semibold text-emerald-100/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          >
            <Globe className="w-4 h-4 shrink-0 text-emerald-300" />
            <span>
              {language === 'mr' ? 'वेबसाईट पहा' : language === 'hi' ? 'वेबसाइट देखें' : 'View Live Website'}
            </span>
          </button>

          {/* External: Open Store */}
          <button
            onClick={onNavigateStore}
            className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-2xl text-xs font-semibold text-emerald-100/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 shrink-0 text-[#E86A10]" />
            <span>
              {language === 'mr' ? 'स्टोअर उघडा' : language === 'hi' ? 'स्टोर खोलें' : 'Open Store Catalog'}
            </span>
          </button>
        </nav>

        {/* Bottom: Language Switcher, Admin Info & Logout */}
        <div className="p-4 border-t border-white/10 bg-black/20 space-y-3">
          {/* Language Switcher */}
          <div className="flex items-center justify-between px-2 text-xs">
            <span className="text-emerald-200/80 font-medium">Language:</span>
            <LanguageSwitcher />
          </div>

          {/* Admin User Card */}
          <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl bg-white/5 border border-white/10">
            <div className="w-7 h-7 rounded-lg bg-[#E86A10] flex items-center justify-center font-bold text-xs text-white">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">{ADMIN_EMAIL}</p>
              <p className="text-[10px] text-emerald-300 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Verified Admin
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-200 hover:text-white border border-red-500/30 text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <LogOut className="w-4 h-4" />
            <span>
              {language === 'mr' ? 'लॉगआउट करा (Logout)' : language === 'hi' ? 'लॉगआउट करें (Logout)' : 'Logout'}
            </span>
          </button>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-xs"
        />
      )}

      {/* ------------------------------------------------------------- */}
      {/* MAIN CONTENT AREA */}
      {/* ------------------------------------------------------------- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#123814]/10 h-16 px-4 sm:px-8 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h1 className="text-base sm:text-lg font-black text-[#123814] tracking-tight flex items-center gap-2">
                {activeTab === 'dashboard' && (
                  <>
                    <LayoutDashboard className="w-5 h-5 text-[#E86A10]" />
                    <span>Dashboard & Analytics</span>
                  </>
                )}
                {activeTab === 'products' && (
                  <>
                    <Boxes className="w-5 h-5 text-[#E86A10]" />
                    <span>Product & Variant Stock Management</span>
                  </>
                )}
                {activeTab === 'offers' && (
                  <>
                    <BadgePercent className="w-5 h-5 text-[#E86A10]" />
                    <span>Offer & Discount Manager</span>
                  </>
                )}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 hidden sm:inline-block">
                {syncStatus}
              </span>
            </div>

            <button
              onClick={onNavigateStore}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#123814] bg-[#EFFDF0] hover:bg-[#dff7e1] border border-[#123814]/20 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#E86A10]" />
              <span className="hidden sm:inline">
                {language === 'mr' ? 'स्टोअर पहा' : language === 'hi' ? 'स्टोर देखें' : 'View Store'}
              </span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* RLS Policy Warning Banner (if Supabase blocked the save) */}
          {rlsError && (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-fade-in">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-amber-950">
                    {language === 'mr'
                      ? 'Supabase Security Policy Required (किंमत सर्व ग्राहकांसाठी सेव्ह करण्यासाठी १ सेटिंग आवश्यक):'
                      : language === 'hi'
                      ? 'Supabase Security Policy Required (कीमत सभी ग्राहकों के लिए सेव करने हेतु १ सेटिंग आवश्यक):'
                      : 'Supabase Security Policy Required (Action required to save prices for all users):'}
                  </h4>
                  <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                    {language === 'mr'
                      ? 'Supabase मधील Row-Level Security (RLS) मुळे किमती सेव्ह होत नाहीत. खालील SQL कमांड Supabase च्या SQL Editor मध्ये Run करा:'
                      : language === 'hi'
                      ? 'Supabase की Row-Level Security (RLS) के कारण कीमतें सेव नहीं हो रही हैं। नीचे दी गई SQL कमांड को Supabase SQL Editor में Run करें:'
                      : 'Row-Level Security (RLS) in Supabase is blocking public saves. Please run the following command in Supabase SQL Editor:'}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <code className="text-xs font-mono font-bold bg-white px-3 py-1.5 rounded-lg border border-amber-300 text-amber-900 shadow-xs">
                      alter table product_prices disable row level security;
                    </code>
                  </div>
                </div>
              </div>
              <button
                onClick={handleCopySql}
                className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold bg-amber-700 hover:bg-amber-800 active:scale-95 text-white px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{sqlCopied ? 'Copied to Clipboard!' : 'Copy SQL Command'}</span>
              </button>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {/* ========================================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in">
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-[#123814] via-[#1a4e1d] to-[#E86A10] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-bold mb-3 backdrop-blur-xs">
                    <ShieldCheck className="w-4 h-4 text-[#E86A10]" />
                    <span>Navbharat Agro Control Center</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                    {language === 'mr'
                      ? 'स्वागत आहे, ॲडमिन!'
                      : language === 'hi'
                      ? 'स्वागत है, व्यवस्थापक!'
                      : 'Welcome Back, Admin!'}
                  </h2>
                  <p className="text-sm text-emerald-100/90 mt-2 leading-relaxed font-medium">
                    {language === 'mr'
                      ? 'येथून तुम्ही नवभारत ॲग्रोचे सर्व प्रॉडक्ट्स, लाइव्ह किमती, इन-स्टॉक स्थिती आणि सवलत ऑफर्स एकाच ठिकाणाहून व्यवस्थापित करू शकता.'
                      : language === 'hi'
                      ? 'यहाँ से आप नवभारत ॲग्रो के सभी उत्पाद, लाइव मूल्य, इन-स्टॉक स्थिति और डिस्काउंट ऑफर एक ही स्थान से प्रबंधित कर सकते हैं।'
                      : 'Monitor product availability, real-time prices, variant packaging, and promotional campaign offers from a single unified hub.'}
                  </p>
                </div>

                <div className="absolute -right-8 -bottom-10 opacity-15 pointer-events-none hidden lg:block">
                  <img
                    src={getAssetUrl('/Whitte Circle logo(3).png')}
                    alt="Background Emblem"
                    className="w-72 h-72 object-contain"
                  />
                </div>
              </div>

              {/* 3 KPI Metric Cards in 1 Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Products */}
                <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                    <Package className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {language === 'mr' ? 'एकूण उत्पादने' : language === 'hi' ? 'कुल उत्पाद' : 'Total Products'}
                  </p>
                  <p className="text-3xl sm:text-4xl font-black text-[#123814] mt-1">
                    {metrics.total}
                  </p>
                  <p className="text-xs text-gray-500 mt-1.5 font-medium">Active in store</p>
                </div>

                {/* Active Offers */}
                <div className="bg-white p-6 rounded-3xl border border-orange-200/80 shadow-xs hover:shadow-md transition-all bg-gradient-to-b from-white to-orange-50/30">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-bold text-orange-800 uppercase tracking-wider">
                    {language === 'mr' ? 'सक्रिय ऑफर्स' : language === 'hi' ? 'सक्रिय ऑफर्स' : 'Active Offers'}
                  </p>
                  <p className="text-3xl sm:text-4xl font-black text-[#E86A10] mt-1">
                    {metrics.activeOffersCount}
                  </p>
                  <p className="text-xs text-orange-600 mt-1.5 font-medium">Promotions live</p>
                </div>

                {/* Categories */}
                <div className="bg-white p-6 rounded-3xl border border-blue-200/80 shadow-xs hover:shadow-md transition-all bg-gradient-to-b from-white to-blue-50/30">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                    <Layers className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-bold text-blue-800 uppercase tracking-wider">
                    {language === 'mr' ? 'कॅटेगरीज' : language === 'hi' ? 'श्रेणियां' : 'Categories'}
                  </p>
                  <p className="text-3xl sm:text-4xl font-black text-blue-700 mt-1">
                    {metrics.categoryCount}
                  </p>
                  <p className="text-xs text-blue-600 mt-1.5 font-medium">Product classifications</p>
                </div>
              </div>

              {/* Quick Inventory Snapshot Table */}
              <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                  <div>
                    <h3 className="text-base font-black text-gray-900">
                      {language === 'mr'
                        ? 'इन्व्हेंटरी आणि स्टॉक स्थिती'
                        : language === 'hi'
                        ? 'इन्वेंट्री और स्टॉक स्थिति'
                        : 'Inventory & Catalog Snapshot'}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {language === 'mr'
                        ? 'प्रत्येक उत्पादनाची किंमत, उपलब्धता आणि सक्रिय ऑफरची माहिती'
                        : language === 'hi'
                        ? 'प्रत्येक उत्पाद की कीमत, उपलब्धता और सक्रिय ऑफर की जानकारी'
                        : 'Quick overview of current product rates, stock status, and active promotional badges.'}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('products')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#123814] hover:bg-[#1a4a1d] text-white px-4 py-2 rounded-xl transition-all cursor-pointer shadow-xs"
                  >
                    <Boxes className="w-3.5 h-3.5" />
                    <span>Manage All Products</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-gray-100 text-gray-400 uppercase tracking-wider text-[10px]">
                        <th className="pb-3 font-bold">Product</th>
                        <th className="pb-3 font-bold">Category</th>
                        <th className="pb-3 font-bold">Available Variants</th>
                        <th className="pb-3 font-bold">Stock Status</th>
                        <th className="pb-3 font-bold">Active Offer</th>
                        <th className="pb-3 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {products.map((prod) => {
                        const key = getProductKey(prod);
                        const state = editedStates[key];
                        const inStock = state?.inStock !== false;
                        const variantsList = state?.variants || prod.variants || [];
                        const hasActiveOffer = Object.values(state?.variantOffers || {}).some(
                          (vo) => vo.enabled
                        ) || Boolean(state?.offer?.enabled);

                        return (
                          <tr key={key} className="hover:bg-gray-50/70 transition-colors">
                            <td className="py-3.5 pr-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={getAssetUrl(prod.image)}
                                  alt={prod.name}
                                  className="w-9 h-9 object-contain rounded-xl bg-[#EFFDF0] p-1 border border-gray-200"
                                />
                                <div>
                                  <p className="font-extrabold text-gray-900">{prod.name}</p>
                                  <p className="text-[10px] text-gray-500">{prod.packaging}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 pr-4 text-gray-600 font-medium">
                              {prod.category}
                            </td>
                            <td className="py-3.5 pr-4 font-bold text-[#123814]">
                              <span className="bg-[#EFFDF0] text-[#123814] px-2 py-0.5 rounded-md border border-[#123814]/10 text-[11px]">
                                {variantsList.length} {variantsList.length === 1 ? 'Size' : 'Sizes'}
                              </span>
                            </td>
                            <td className="py-3.5 pr-4">
                              {inStock ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  <CheckCircle className="w-3 h-3" />
                                  <span>In Stock</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                                  <XCircle className="w-3 h-3" />
                                  <span>Out of Stock</span>
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 pr-4">
                              {hasActiveOffer ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-orange-50 text-orange-700 border border-orange-200">
                                  <Sparkles className="w-3 h-3 text-[#E86A10]" />
                                  <span>Special Deals Live</span>
                                </span>
                              ) : (
                                <span className="text-[11px] text-gray-400">Regular Price</span>
                              )}
                            </td>
                            <td className="py-3.5 text-right space-x-2">
                              <button
                                onClick={() => handleOpenEditModal(prod)}
                                className="text-xs font-bold text-[#123814] hover:text-[#E86A10] transition-colors cursor-pointer"
                              >
                                Edit Stock & Rates
                              </button>
                              <span className="text-gray-300">•</span>
                              <button
                                onClick={() => setActiveTab('offers')}
                                className="text-xs font-bold text-[#E86A10] hover:text-orange-700 transition-colors cursor-pointer"
                              >
                                Manage Offers
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: PRODUCT MANAGEMENT (WITH ADD NEW PRODUCT OPTION)   */}
          {/* ========================================================= */}
          {activeTab === 'products' && (
            <div className="space-y-6 animate-fade-in">
              {/* Section Header with Search and Add Product Button */}
              <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#123814] tracking-tight">
                    {language === 'mr'
                      ? 'उत्पादन आणि स्टॉक व्यवस्थापन (Product & Stock)'
                      : language === 'hi'
                      ? 'उत्पाद और स्टॉक प्रबंधन (Product & Stock)'
                      : 'Product & Stock Management'}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {language === 'mr'
                      ? 'नवीन उत्पादन जोडा, किमती व्यवस्थापित करा आणि इन-स्टॉक उपलब्धता ठरवा.'
                      : language === 'hi'
                      ? 'नया उत्पाद जोड़ें, कीमतें प्रबंधित करें और इन-स्टॉक उपलब्धता तय करें।'
                      : 'Add new products to store, manage variant rates, and toggle stock availability.'}
                  </p>
                </div>

                {/* Search Bar + Add Product Button (Replaces the removed category row) */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search product..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#123814]"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setNewProdError(null);
                      setIsAddProductModalOpen(true);
                    }}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#E86A10] hover:bg-[#d05c0b] text-white text-xs font-black shadow-md active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" />
                    <span>
                      {language === 'mr'
                        ? '+ नवीन प्रॉडक्ट जोडा'
                        : language === 'hi'
                        ? '+ नया उत्पाद जोड़ें'
                        : '+ Add New Product'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Product Cards Grid: ONLY EDIT OPTION ON CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const key = getProductKey(product);
                  const editState = editedStates[key] || {
                    basePrice: product.price,
                    variants: product.variants,
                    variantPrices: product.variantPrices,
                    inStock: true,
                    variantStock: {},
                    offer: { enabled: false },
                    variantOffers: {},
                  };
                  const inStock = editState.inStock !== false;
                  const currentVariants = editState.variants || product.variants || [];

                  return (
                    <div
                      key={key}
                      className={`bg-white rounded-3xl border transition-all overflow-hidden flex flex-col justify-between ${
                        inStock
                          ? 'border-gray-200/80 shadow-xs hover:shadow-md'
                          : 'border-rose-200 bg-rose-50/20 shadow-xs'
                      }`}
                    >
                      {/* Product Header & Overview */}
                      <div>
                        <div className="p-5 flex items-start justify-between gap-3.5 border-b border-gray-100">
                          <div className="flex items-start gap-3 min-w-0">
                            <div className="w-14 h-14 rounded-2xl bg-[#EFFDF0] border border-[#123814]/10 p-1.5 flex items-center justify-center shrink-0 shadow-2xs">
                              <img
                                src={getAssetUrl(product.image)}
                                alt={product.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="min-w-0">
                              <span className="text-[10px] font-bold text-[#123814] bg-[#EFFDF0] px-2 py-0.5 rounded-md border border-[#123814]/10 truncate block w-fit">
                                {product.category}
                              </span>
                              <h3 className="text-sm font-black text-gray-900 mt-1 truncate">
                                {product.name}
                              </h3>
                              <p className="text-[11px] text-gray-500 truncate">{product.subtitle}</p>
                            </div>
                          </div>

                          {/* Master Stock Badge */}
                          <div className="shrink-0">
                            {inStock ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <CheckCircle className="w-3 h-3 text-emerald-600" />
                                <span>In Stock</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                                <XCircle className="w-3 h-3 text-rose-600" />
                                <span>Out of Stock</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Variants Summary Showcase */}
                        <div className="p-5 space-y-3">
                          <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                            <span className="flex items-center gap-1.5">
                              <Layers className="w-3.5 h-3.5 text-gray-400" />
                              <span>
                                {language === 'mr'
                                  ? 'उपलब्ध व्हॅरिएंट्स आणि स्टॉक:'
                                  : language === 'hi'
                                  ? 'उपलब्ध वैरिएंट्स और स्टॉक:'
                                  : 'Available Variants & Stock:'}
                              </span>
                            </span>
                            <span className="text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              {currentVariants.length} {currentVariants.length === 1 ? 'Size' : 'Sizes'}
                            </span>
                          </div>

                          {/* Variant Pills with Rate & Individual Stock */}
                          <div className="space-y-1.5">
                            {currentVariants.map((variant) => {
                              const vPrice =
                                editState.variantPrices?.[variant] ??
                                product.variantPrices?.[variant] ??
                                editState.basePrice;
                              const isVariantInStock =
                                inStock && editState.variantStock?.[variant] !== false;

                              return (
                                <div
                                  key={variant}
                                  className={`flex items-center justify-between px-3 py-2 rounded-xl border text-xs transition-colors ${
                                    isVariantInStock
                                      ? 'bg-gray-50/80 border-gray-200/80 text-gray-800'
                                      : 'bg-rose-50/60 border-rose-200 text-rose-800'
                                  }`}
                                >
                                  <div className="flex items-center gap-2 min-w-0">
                                    <span
                                      className={`w-2 h-2 rounded-full shrink-0 ${
                                        isVariantInStock ? 'bg-emerald-500' : 'bg-rose-500'
                                      }`}
                                    />
                                    <span className="font-bold truncate">{variant}</span>
                                  </div>

                                  <div className="flex items-center gap-2 shrink-0">
                                    <span className="font-extrabold text-[#123814]">₹{vPrice}</span>
                                    <span
                                      className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider ${
                                        isVariantInStock
                                          ? 'bg-emerald-100/80 text-emerald-800'
                                          : 'bg-rose-100 text-rose-800'
                                      }`}
                                    >
                                      {isVariantInStock ? 'In Stock' : 'Out'}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Card Footer: Clean Edit Button Only */}
                      <div className="p-4 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between gap-3">
                        <span className="text-[11px] text-gray-500 font-medium">
                          {inStock ? 'Ready for orders' : 'Product unavailable'}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(product)}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#123814] hover:bg-[#1c5520] text-white active:scale-95 transition-all cursor-pointer shadow-xs"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-[#E86A10]" />
                          <span>
                            {language === 'mr'
                              ? 'व्हॅरिएंट्स एडिट करा (Edit)'
                              : language === 'hi'
                              ? 'वैरिएंट्स एडिट करें (Edit)'
                              : 'Edit Variants & Rates'}
                          </span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: OFFER MANAGEMENT (INDIVIDUAL VARIANT OFFERS)      */}
          {/* ========================================================= */}
          {activeTab === 'offers' && (
            <div className="space-y-6 animate-fade-in">
              {/* Section Header */}
              <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#123814] tracking-tight flex items-center gap-2">
                    <BadgePercent className="w-6 h-6 text-[#E86A10]" />
                    <span>
                      {language === 'mr'
                        ? 'व्हॅरिएंटनुसार ऑफर व्यवस्थापन (Variant Offers)'
                        : language === 'hi'
                        ? 'वैरिएंट अनुसार ऑफर प्रबंधन (Variant Offers)'
                        : 'Variant-Wise Offer & Discount Manager'}
                    </span>
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {language === 'mr'
                      ? 'प्रत्येक पॅकिंग साईजसाठी स्वतंत्र डिस्काउंट % आणि स्पेशल ऑफर बॅज लावा (उदा. 1kg वर वेगळी, 5kg वर वेगळी ऑफर).'
                      : language === 'hi'
                      ? 'प्रत्येक पैकेजिंग साइज़ के लिए अलग डिस्काउंट % और स्पेशल ऑफर बैज लगाएं (उदा. 1kg पर अलग, 5kg पर अलग ऑफर)।'
                      : 'Configure individual discounts for each packaging variant (e.g. 10% for 1 kg, 15% for 5 kg). Customer sees exact discount & savings in store.'}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for offers..."
                      className="pl-9 pr-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#123814]"
                    />
                  </div>
                </div>
              </div>

              {/* Offer Cards Grid (Per-Variant Offers) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const key = getProductKey(product);
                  const editState = editedStates[key] || {
                    basePrice: product.price,
                    variants: product.variants,
                    variantPrices: product.variantPrices,
                    inStock: true,
                    variantStock: {},
                    offer: { enabled: false, discountPercent: 10, badgeText: '10% OFF' },
                    variantOffers: {},
                  };
                  const isSaving = savingKey === key;
                  const isSaved = savedSuccessKey === key;
                  const currentVariants = editState.variants || product.variants || [];

                  // Count active offers across variants of this product
                  const activeVariantOffersCount = currentVariants.filter(
                    (v) => editState.variantOffers?.[v]?.enabled
                  ).length;

                  // Selected variant tab for this card
                  const activeVariantName =
                    activeOfferVariantMap[key] || currentVariants[0] || 'Standard';

                  // Offer state for the currently selected variant
                  const currentVariantOffer =
                    editState.variantOffers?.[activeVariantName] || {
                      enabled: false,
                      discountPercent: 10,
                      badgeText: 'Special Deal',
                    };

                  const isCurrentOfferActive = Boolean(currentVariantOffer.enabled);
                  const currentDiscount = currentVariantOffer.discountPercent ?? 10;
                  const variantRegularPrice =
                    editState.variantPrices?.[activeVariantName] ??
                    product.variantPrices?.[activeVariantName] ??
                    editState.basePrice;

                  const moneySaved = Math.round(
                    (variantRegularPrice * currentDiscount) / 100
                  );
                  const variantDiscountedPrice = variantRegularPrice - moneySaved;

                  return (
                    <div
                      key={key}
                      className={`bg-white rounded-3xl border transition-all overflow-hidden flex flex-col justify-between ${
                        activeVariantOffersCount > 0
                          ? 'border-orange-300 shadow-md ring-2 ring-[#E86A10]/15'
                          : 'border-gray-200/80 shadow-xs'
                      }`}
                    >
                      {/* Product Header */}
                      <div>
                        <div className="p-5 flex items-start justify-between gap-3.5 border-b border-gray-100">
                          <div className="flex items-start gap-3 min-w-0">
                            <div className="w-14 h-14 rounded-2xl bg-[#EFFDF0] border border-[#123814]/10 p-1.5 flex items-center justify-center shrink-0">
                              <img
                                src={getAssetUrl(product.image)}
                                alt={product.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="min-w-0">
                              <span className="text-[10px] font-bold text-[#123814] bg-[#EFFDF0] px-2 py-0.5 rounded-md border border-[#123814]/10 truncate block w-fit">
                                {product.category}
                              </span>
                              <h3 className="text-sm font-black text-gray-900 mt-1 truncate">
                                {product.name}
                              </h3>
                              <p className="text-[11px] text-gray-500 truncate">
                                {currentVariants.join(' • ')}
                              </p>
                            </div>
                          </div>

                          {/* Active Variant Offers Count Badge */}
                          <div className="shrink-0">
                            {activeVariantOffersCount > 0 ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-orange-100 text-[#E86A10] border border-orange-200">
                                <Sparkles className="w-3 h-3 text-[#E86A10]" />
                                <span>{activeVariantOffersCount} Offers Live</span>
                              </span>
                            ) : (
                              <span className="text-[10px] text-gray-400 font-bold px-2.5 py-1 bg-gray-100 rounded-full inline-block">
                                Regular Rates
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Variant Selector Tabs */}
                        <div className="p-4 bg-gray-50/70 border-b border-gray-100">
                          <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2 block flex items-center justify-between">
                            <span>Select Variant to Configure Offer:</span>
                            <span className="text-[10px] text-[#E86A10] font-bold">
                              {currentVariants.length} Sizes Available
                            </span>
                          </label>

                          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                            {currentVariants.map((v) => {
                              const isVOfferActive = Boolean(
                                editState.variantOffers?.[v]?.enabled
                              );
                              const vDiscount =
                                editState.variantOffers?.[v]?.discountPercent ?? 10;
                              const isSelectedTab = activeVariantName === v;

                              return (
                                <button
                                  key={v}
                                  type="button"
                                  onClick={() =>
                                    setActiveOfferVariantMap((prev) => ({
                                      ...prev,
                                      [key]: v,
                                    }))
                                  }
                                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                                    isSelectedTab
                                      ? 'bg-[#123814] text-white shadow-xs'
                                      : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
                                  }`}
                                >
                                  <span>{v}</span>
                                  {isVOfferActive ? (
                                    <span
                                      className={`text-[8.5px] px-1 py-0.2 rounded-sm font-black ${
                                        isSelectedTab
                                          ? 'bg-[#E86A10] text-white'
                                          : 'bg-orange-100 text-[#E86A10]'
                                      }`}
                                    >
                                      {vDiscount}% OFF
                                    </span>
                                  ) : (
                                    <span className="text-[8.5px] text-gray-400">Regular</span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Variant Offer Details & Sliders */}
                        <div className="p-5 space-y-4">
                          {/* Active Variant Header & Toggle */}
                          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#EFFDF0] border border-[#123814]/10">
                            <div>
                              <span className="text-[10px] font-black uppercase tracking-wider text-[#123814]/70 block">
                                Configuring Packaging Size:
                              </span>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-sm font-black text-[#123814]">
                                  {activeVariantName}
                                </span>
                                <span className="text-xs text-gray-500 font-bold">
                                  (Regular: ₹{variantRegularPrice})
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-col items-end shrink-0">
                              <button
                                type="button"
                                onClick={() =>
                                  handleVariantOfferToggle(key, activeVariantName)
                                }
                                className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${
                                  isCurrentOfferActive
                                    ? 'bg-[#E86A10] justify-end'
                                    : 'bg-gray-300 justify-start'
                                }`}
                                title="Toggle offer for this variant"
                              >
                                <span className="w-4 h-4 bg-white rounded-full shadow-md" />
                              </button>
                              <span
                                className={`text-[9px] font-black mt-0.5 ${
                                  isCurrentOfferActive
                                    ? 'text-[#E86A10]'
                                    : 'text-gray-400'
                                }`}
                              >
                                {isCurrentOfferActive ? 'Offer Active' : 'Regular'}
                              </span>
                            </div>
                          </div>

                          {/* Active Variant Controls */}
                          {isCurrentOfferActive ? (
                            <div className="space-y-4 animate-fade-in">
                              {/* Discount Percentage Slider */}
                              <div>
                                <div className="flex items-center justify-between mb-1.5">
                                  <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                                    <Percent className="w-3.5 h-3.5 text-[#E86A10]" />
                                    <span>Discount on {activeVariantName}:</span>
                                  </label>
                                  <span className="text-xs font-black text-[#E86A10]">
                                    {currentDiscount}% OFF
                                  </span>
                                </div>
                                <input
                                  type="range"
                                  min="1"
                                  max="70"
                                  value={currentDiscount}
                                  onChange={(e) =>
                                    handleVariantOfferDiscountChange(
                                      key,
                                      activeVariantName,
                                      parseInt(e.target.value, 10)
                                    )
                                  }
                                  className="w-full accent-[#E86A10] cursor-pointer"
                                />
                              </div>

                              {/* Live Final Price & Savings Calculation Box */}
                              <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-between">
                                <div>
                                  <p className="text-[10px] font-bold text-orange-800 uppercase">
                                    Customer Pays in Store
                                  </p>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-base font-black text-gray-900">
                                      ₹{variantDiscountedPrice}
                                    </span>
                                    <span className="text-xs line-through text-gray-400 font-bold">
                                      ₹{variantRegularPrice}
                                    </span>
                                  </div>
                                </div>
                                <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-xl shadow-2xs">
                                  Save ₹{moneySaved} ({currentDiscount}% OFF)
                                </span>
                              </div>

                              {/* Promo Badge Text Input */}
                              <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                                  <Sparkles className="w-3.5 h-3.5 text-[#E86A10]" />
                                  <span>Promo Badge for {activeVariantName}:</span>
                                </label>
                                <input
                                  type="text"
                                  value={currentVariantOffer.badgeText || ''}
                                  onChange={(e) =>
                                    handleVariantOfferBadgeChange(
                                      key,
                                      activeVariantName,
                                      e.target.value
                                    )
                                  }
                                  placeholder="e.g. Special Deal, 10% OFF, Diwali Offer"
                                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 focus:outline-none focus:border-[#E86A10]"
                                />
                              </div>

                              {/* Quick Action: Apply to all sizes */}
                              <button
                                type="button"
                                onClick={() =>
                                  handleApplyDiscountToAllVariants(
                                    key,
                                    currentDiscount,
                                    currentVariantOffer.badgeText || `${currentDiscount}% OFF`
                                  )
                                }
                                className="w-full py-1.5 px-3 rounded-xl border border-dashed border-[#E86A10]/40 text-[#E86A10] hover:bg-orange-50 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                              >
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Apply {currentDiscount}% discount to all sizes of this product</span>
                              </button>
                            </div>
                          ) : (
                            <div className="p-5 text-center bg-gray-50/70 rounded-2xl border border-dashed border-gray-200">
                              <Tag className="w-7 h-7 text-gray-300 mx-auto mb-1.5" />
                              <p className="text-xs font-bold text-gray-700">
                                No offer on {activeVariantName}
                              </p>
                              <p className="text-[11px] text-gray-400 mt-0.5">
                                Toggle the switch above to activate a discount for this packaging size.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Footer Save Button */}
                      <div className="p-4 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between gap-3">
                        <div className="text-[11px] text-gray-500">
                          {isSaved ? (
                            <span className="inline-flex items-center gap-1 text-emerald-700 font-bold animate-fade-in">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Offers saved to database!</span>
                            </span>
                          ) : (
                            <span>{activeVariantOffersCount} active offers</span>
                          )}
                        </div>

                        <button
                          onClick={() => handleSaveOffer(product)}
                          disabled={isSaving}
                          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
                            isSaved
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#E86A10] hover:bg-[#d45e0d] text-white active:scale-95'
                          } disabled:opacity-50`}
                        >
                          {isSaving ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>Saving...</span>
                            </>
                          ) : isSaved ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Saved</span>
                            </>
                          ) : (
                            <>
                              <Save className="w-3.5 h-3.5" />
                              <span>Save Variant Offers</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ============================================================= */}
      {/* POPUP MODAL 1: ADD NEW PRODUCT MODAL (NAME, IMAGE, VARIANTS)  */}
      {/* ============================================================= */}
      {isAddProductModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          onClick={() => {
            if (!isSavingNewProduct) setIsAddProductModalOpen(false);
          }}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border-2 border-[#123814]/15 overflow-hidden animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-[#123814] via-[#1a4e1d] to-[#E86A10] text-white flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-200 bg-white/10 px-2.5 py-0.5 rounded-full inline-block">
                  {language === 'mr' ? 'नवीन उत्पादन' : language === 'hi' ? 'नया उत्पाद' : 'New Product'}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white mt-1">
                  {language === 'mr'
                    ? 'नवीन उत्पादन जोडा (Add New Product)'
                    : language === 'hi'
                    ? 'नया उत्पाद जोड़ें (Add New Product)'
                    : 'Add New Product to Catalog'}
                </h3>
                <p className="text-xs text-emerald-100/90 font-medium mt-0.5">
                  {language === 'mr'
                    ? 'उत्पादनाचे नाव, फोटो व पॅकिंग साईजनुसार किमती प्रविष्ट करा.'
                    : language === 'hi'
                    ? 'उत्पाद का नाम, फोटो व पैकेजिंग साइज़ अनुसार कीमतें दर्ज करें।'
                    : 'Enter product name, image, and initial packaging variants with their rates.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!isSavingNewProduct) setIsAddProductModalOpen(false);
                }}
                className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Scrollable */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 bg-[#F9FBF9]">
              {newProdError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-bold text-rose-700 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{newProdError}</span>
                </div>
              )}

              {/* 1. Product Name & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1">
                    {language === 'mr' ? 'उत्पादनाचे नाव (Product Name)*' : 'Product Name *'}
                  </label>
                  <input
                    type="text"
                    value={newProdName}
                    onChange={(e) => {
                      setNewProdName(e.target.value);
                      setNewProdError(null);
                    }}
                    placeholder={
                      language === 'mr'
                        ? 'उदा. दुग्धसमृद्धी कॅल्शियम प्रो'
                        : 'e.g. Dugdhsamrudhi Milk Plus'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 bg-white focus:outline-none focus:border-[#123814] focus:ring-1 focus:ring-[#123814]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1">
                    {language === 'mr' ? 'कॅटेगरी (Category)' : 'Category'}
                  </label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 bg-white focus:outline-none focus:border-[#123814] focus:ring-1 focus:ring-[#123814]"
                  >
                    {PRESET_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-700 mb-1">
                  {language === 'mr' ? 'उद्देश / सबटायटल (Subtitle)' : 'Subtitle / Tagline'}
                </label>
                <input
                  type="text"
                  value={newProdSubtitle}
                  onChange={(e) => setNewProdSubtitle(e.target.value)}
                  placeholder="e.g. High Yield Dairy Nutrition & Milk Fat Booster"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-medium text-gray-900 bg-white focus:outline-none focus:border-[#123814]"
                />
              </div>

              {/* 2. Product Image Selector & Upload */}
              <div className="p-4 rounded-2xl bg-white border border-gray-200/90 space-y-3">
                <label className="block text-xs font-black uppercase tracking-wider text-gray-700 flex items-center justify-between">
                  <span>{language === 'mr' ? 'उत्पादनाचा फोटो (Product Image)' : 'Product Image'}</span>
                  <span className="text-[10px] text-gray-400 font-normal">Choose preset or upload</span>
                </label>

                {/* Preview Box */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#EFFDF0] border border-[#123814]/15 p-1.5 flex items-center justify-center shrink-0 shadow-2xs">
                    <img
                      src={getAssetUrl(newProdImage)}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    {/* File Upload Button */}
                    <div className="flex items-center gap-2">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold border border-gray-300 cursor-pointer transition-colors shadow-2xs">
                        <Upload className="w-3.5 h-3.5 text-[#E86A10]" />
                        <span>Upload Custom Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileUpload}
                          className="hidden"
                        />
                      </label>
                      <span className="text-[11px] text-gray-400">PNG, JPG, WebP</span>
                    </div>

                    {/* Presets List */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                      {PRESET_IMAGES.map((img) => (
                        <button
                          key={img.label}
                          type="button"
                          onClick={() => setNewProdImage(img.url)}
                          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer whitespace-nowrap ${
                            newProdImage === img.url
                              ? 'bg-[#123814] text-white border-[#123814] shadow-xs'
                              : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
                          }`}
                        >
                          <img
                            src={getAssetUrl(img.url)}
                            alt={img.label}
                            className="w-4 h-4 object-contain"
                          />
                          <span>{img.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Variants with Price at Start */}
              <div className="p-4 rounded-2xl bg-white border border-gray-200/90 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#E86A10]" />
                    <span>
                      {language === 'mr'
                        ? 'पॅकिंग साईज आणि किमती (Packaging Variants with Price)*'
                        : 'Packaging Variants & Prices at Start *'}
                    </span>
                  </label>

                  <button
                    type="button"
                    onClick={handleAddVariantRow}
                    className="inline-flex items-center gap-1 text-[11px] font-black text-[#E86A10] hover:text-[#d05c0b] cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{language === 'mr' ? '+ साईज जोडा' : '+ Add Variant'}</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {newProdVariants.map((variant, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gray-50 border border-gray-200"
                    >
                      <div className="flex-1">
                        <input
                          type="text"
                          value={variant.size}
                          onChange={(e) => handleUpdateVariantRow(index, 'size', e.target.value)}
                          placeholder="e.g. 1 kg, 5 kg, 40 kg Bag, 1 Litre"
                          className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-bold text-gray-900 bg-white focus:outline-none focus:border-[#123814]"
                        />
                      </div>

                      <div className="relative w-36">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500">
                          ₹
                        </span>
                        <input
                          type="number"
                          min="0"
                          value={variant.price}
                          onChange={(e) => handleUpdateVariantRow(index, 'price', e.target.value)}
                          placeholder="Price (₹)"
                          className="w-full pl-6 pr-2.5 py-1.5 rounded-lg border border-gray-300 text-xs font-black text-[#123814] bg-white focus:outline-none focus:border-[#123814]"
                        />
                      </div>

                      {newProdVariants.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveVariantRow(index)}
                          className="p-1 text-gray-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Remove row"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Initial Stock Status */}
              <div className="p-3.5 rounded-2xl bg-white border border-gray-200/90 flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold text-[#123814] block">
                    {language === 'mr' ? 'स्टॉक उपलब्धता (Initial Stock Status)' : 'Initial Stock Status'}
                  </span>
                  <span className="text-[11px] text-gray-500">
                    {newProdInStock ? 'Product is available in store immediately' : 'Marked as Out of Stock'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setNewProdInStock((prev) => !prev)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${
                    newProdInStock ? 'bg-emerald-600 justify-end' : 'bg-gray-300 justify-start'
                  }`}
                >
                  <span className="w-4 h-4 bg-white rounded-full shadow-md" />
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 bg-white border-t border-gray-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  if (!isSavingNewProduct) setIsAddProductModalOpen(false);
                }}
                disabled={isSavingNewProduct}
                className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                {language === 'mr' ? 'रद्द करा (Cancel)' : 'Cancel'}
              </button>

              <div className="flex items-center gap-3">
                {newProductSuccess && (
                  <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-700 animate-fade-in">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Product Added Successfully!</span>
                  </span>
                )}

                <button
                  type="button"
                  onClick={handleSaveNewProduct}
                  disabled={isSavingNewProduct}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer shadow-md ${
                    newProductSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#E86A10] hover:bg-[#d05c0b] text-white active:scale-95'
                  } disabled:opacity-50`}
                >
                  {isSavingNewProduct ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Adding Product...</span>
                    </>
                  ) : newProductSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Added!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>
                        {language === 'mr'
                          ? 'उत्पादन सेव्ह करा (Save Product)'
                          : language === 'hi'
                          ? 'उत्पाद सेव करें (Save Product)'
                          : 'Save & Publish Product'}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* POPUP MODAL 2: VARIANT PRICING & STOCK MANAGER (NO BASE PRICE)  */}
      {/* ============================================================= */}
      {editingProduct && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          onClick={() => {
            if (!modalIsSaving) setEditingProduct(null);
          }}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border-2 border-[#123814]/15 overflow-hidden animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-[#123814] to-[#1c5520] text-white flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <label
                  className="relative group cursor-pointer w-12 h-12 rounded-2xl bg-white p-1 border border-white/20 shrink-0 shadow-sm flex items-center justify-center hover:ring-2 hover:ring-[#E86A10] transition-all"
                  title={language === 'mr' ? 'फोटो बदला' : 'Click to change image'}
                >
                  <img
                    src={getAssetUrl(editProdImage || editingProduct.image)}
                    alt={editProdName || editingProduct.name}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#E86A10] text-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <Pencil className="w-2.5 h-2.5" />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleEditImageFileUpload}
                    className="hidden"
                  />
                </label>
                <div className="min-w-0">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-200 bg-white/10 px-2 py-0.5 rounded-full inline-block">
                    {editProdCategory || editingProduct.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-white truncate mt-0.5">
                    {editProdName || editingProduct.name}
                  </h3>
                  <p className="text-xs text-emerald-100/80 font-medium">
                    {language === 'mr'
                      ? 'उत्पादनाचे नाव, फोटो, माहिती, पॅकिंग साईजचे दर आणि स्टॉक बदला'
                      : language === 'hi'
                      ? 'उत्पाद का नाम, फोटो, विवरण, पैकेजिंग साइज़ के दाम और स्टॉक बदलें'
                      : 'Edit product name, image, description, variant rates, and stock'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!modalIsSaving) setEditingProduct(null);
                }}
                className="text-white/70 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Scrollable */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-[#F9FBF9]">
              {/* Product Details Section: Name, Image, Category & Description */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-2.5">
                  <Package className="w-4 h-4 text-[#E86A10]" />
                  <h4 className="text-xs sm:text-sm font-black text-[#123814] uppercase tracking-wider">
                    {language === 'mr'
                      ? 'उत्पादन तपशील (Product Name, Image & Description)'
                      : language === 'hi'
                      ? 'उत्पाद विवरण (Product Name, Image & Description)'
                      : 'Product Details (Name, Image & Description)'}
                  </h4>
                </div>

                {/* Name & Category Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {language === 'mr' ? 'उत्पादनाचे नाव (Product Name):' : 'Product Name:'}
                    </label>
                    <input
                      type="text"
                      value={editProdName}
                      onChange={(e) => setEditProdName(e.target.value)}
                      placeholder="e.g. NavMin Mineral Mixture"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 bg-white focus:outline-none focus:border-[#123814]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {language === 'mr' ? 'कॅटेगरी (Category):' : 'Category:'}
                    </label>
                    <select
                      value={editProdCategory}
                      onChange={(e) => setEditProdCategory(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 bg-white focus:outline-none focus:border-[#123814]"
                    >
                      {PRESET_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description & Subtitle */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {language === 'mr' ? 'वर्णन / माहिती (Description):' : 'Description / Subtitle:'}
                  </label>
                  <textarea
                    rows={2}
                    value={editProdDescription}
                    onChange={(e) => {
                      setEditProdDescription(e.target.value);
                      setEditProdSubtitle(e.target.value);
                    }}
                    placeholder="Short description or benefits of this product..."
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs font-medium text-gray-900 bg-white focus:outline-none focus:border-[#123814] resize-none"
                  />
                </div>

                {/* Product Image Selector with Pencil Edit (No preset references) */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {language === 'mr' ? 'उत्पादन फोटो (Product Image):' : 'Product Image:'}
                  </label>

                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-200">
                    {/* Image box with pencil icon overlay */}
                    <label
                      className="relative group cursor-pointer w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white border-2 border-dashed border-[#123814]/25 hover:border-[#E86A10] p-2 flex items-center justify-center shadow-xs transition-all overflow-hidden shrink-0"
                      title={language === 'mr' ? 'नवीन फोटो अपलोड करण्यासाठी येथे क्लिक करा' : 'Click to upload new image'}
                    >
                      <img
                        src={getAssetUrl(editProdImage || editingProduct.image)}
                        alt="Product Preview"
                        className="w-full h-full object-contain transition-transform group-hover:scale-105"
                      />

                      {/* Pencil Badge */}
                      <div className="absolute bottom-1.5 right-1.5 w-7 h-7 rounded-full bg-[#E86A10] text-white shadow-md flex items-center justify-center group-hover:scale-110 group-hover:bg-[#d05c0b] transition-all">
                        <Pencil className="w-3.5 h-3.5 text-white" />
                      </div>

                      {/* Full Hover Mask */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white rounded-2xl">
                        <Pencil className="w-5 h-5 mb-1 text-white" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">
                          {language === 'mr' ? 'फोटो बदला' : 'Change'}
                        </span>
                      </div>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleEditImageFileUpload}
                        className="hidden"
                      />
                    </label>

                    {/* Information and Action Button */}
                    <div className="flex-1 space-y-2 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-black text-[#123814]">
                        <Pencil className="w-3.5 h-3.5 text-[#E86A10]" />
                        <span>
                          {language === 'mr'
                            ? 'नवीन फोटो अपलोड करण्यासाठी फोटो किंवा पेन्सिल आयकॉनवर क्लिक करा'
                            : 'Click on the image or pencil icon to upload a new product photo'}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 font-medium">
                        {language === 'mr'
                          ? 'PNG, JPG किंवा WebP फॉरमॅट सपोर्टेड आहे.'
                          : 'Supports PNG, JPG, or WebP. Transparent background image recommended.'}
                      </p>
                      <div>
                        <label className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-gray-100 text-gray-800 text-xs font-bold border border-gray-300 hover:border-[#E86A10] cursor-pointer transition-colors shadow-2xs">
                          <Upload className="w-3.5 h-3.5 text-[#E86A10]" />
                          <span>
                            {language === 'mr' ? 'फोटो निवडा (Upload Photo)' : 'Choose New Photo'}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleEditImageFileUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Master Product Stock Toggle */}
              <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-2xs flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-[#123814] flex items-center gap-1.5">
                    <SlidersHorizontal className="w-4 h-4 text-[#E86A10]" />
                    <span>
                      {language === 'mr'
                        ? 'संपूर्ण उत्पादन उपलब्धता (Overall Product Stock)'
                        : language === 'hi'
                        ? 'कुल उत्पाद उपलब्धता (Overall Product Stock)'
                        : 'Overall Product Availability (Master Stock)'}
                    </span>
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    {language === 'mr'
                      ? 'हे बंद केल्यास संपूर्ण उत्पादन स्टोअरमध्ये "स्टॉक संपला" दिसेल.'
                      : language === 'hi'
                      ? 'इसे बंद करने पर पूरा उत्पाद स्टोर में "आउट ऑफ स्टॉक" दिखेगा।'
                      : 'Turning this off marks all variants as Out of Stock in store.'}
                  </p>
                </div>

                <div className="flex flex-col items-end shrink-0">
                  <button
                    type="button"
                    onClick={() => setModalMasterInStock((prev) => !prev)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${
                      modalMasterInStock ? 'bg-emerald-600 justify-end' : 'bg-gray-300 justify-start'
                    }`}
                  >
                    <span className="w-4 h-4 bg-white rounded-full shadow-md" />
                  </button>
                  <span
                    className={`text-[9.5px] font-bold mt-1 ${
                      modalMasterInStock ? 'text-emerald-700' : 'text-rose-600'
                    }`}
                  >
                    {modalMasterInStock
                      ? language === 'mr'
                        ? 'उपलब्ध (In Stock)'
                        : 'In Stock'
                      : language === 'mr'
                      ? 'स्टॉक संपला (Out)'
                      : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Variants List Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#E86A10]" />
                    <span>
                      {language === 'mr'
                        ? 'पॅकिंग साईज, दर व स्वतंत्र स्टॉक उपलब्धता:'
                        : language === 'hi'
                        ? 'पैकेजिंग साइज़, दर व स्वतंत्र स्टॉक उपलब्धता:'
                        : 'Packaging Sizes, Rates & Variant Stock Availability:'}
                    </span>
                  </label>
                  <span className="text-[11px] text-gray-500 font-bold">
                    {modalVariants.length} {modalVariants.length === 1 ? 'Variant' : 'Variants'}
                  </span>
                </div>

                {modalVariants.length === 0 ? (
                  <div className="p-6 bg-white rounded-2xl border border-dashed border-gray-300 text-center text-xs text-gray-500">
                    No packaging variants found. Please add a variant below.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {modalVariants.map((variant) => {
                      const vPrice = modalPrices[variant] ?? editingProduct.price;
                      const isVariantInStock = modalStock[variant] !== false;

                      return (
                        <div
                          key={variant}
                          className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                            isVariantInStock
                              ? 'bg-white border-gray-200/90 shadow-2xs'
                              : 'bg-rose-50/50 border-rose-200/90'
                          }`}
                        >
                          {/* Variant Name */}
                          <div className="flex-1 min-w-0 flex items-center gap-2">
                            <span
                              className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                                isVariantInStock ? 'bg-emerald-500' : 'bg-rose-500'
                              }`}
                            />
                            <span className="font-extrabold text-xs sm:text-sm text-gray-900 truncate">
                              {variant}
                            </span>
                          </div>

                          {/* Controls: Price Input + InStock Switch + Delete */}
                          <div className="flex items-center gap-3 shrink-0 justify-between sm:justify-end">
                            {/* Price Input with ₹ */}
                            <div className="relative w-32">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-gray-500 text-xs">
                                ₹
                              </span>
                              <input
                                type="number"
                                min="0"
                                value={vPrice}
                                onChange={(e) =>
                                  handleModalPriceChange(variant, parseFloat(e.target.value))
                                }
                                placeholder="Rate"
                                className="w-full pl-7 pr-3 py-1.5 rounded-xl border border-gray-300 bg-white font-extrabold text-xs text-[#123814] focus:outline-none focus:border-[#123814]"
                              />
                            </div>

                            {/* Variant In-Stock Toggle Button */}
                            <button
                              type="button"
                              onClick={() => handleModalVariantStockToggle(variant)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${
                                isVariantInStock
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                                  : 'bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100'
                              }`}
                              title="Click to toggle variant stock"
                            >
                              {isVariantInStock ? (
                                <>
                                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>{language === 'mr' ? 'उपलब्ध' : 'In Stock'}</span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-3.5 h-3.5 text-rose-600" />
                                  <span>{language === 'mr' ? 'स्टॉक संपला' : 'Out of Stock'}</span>
                                </>
                              )}
                            </button>

                            {/* Delete Variant Button */}
                            <button
                              type="button"
                              onClick={() => handleDeleteVariant(variant)}
                              className="p-1.5 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Delete this variant"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Add New Variant Box (e.g. 10kg, 12kg) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#EFFDF0] to-white border-2 border-dashed border-[#123814]/20 space-y-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-[#123814]">
                  <Plus className="w-4 h-4 text-[#E86A10]" />
                  <span>
                    {language === 'mr'
                      ? '+ नवीन पॅकिंग व्हॅरिएंट / साईज जोडा'
                      : language === 'hi'
                      ? '+ नया पैकेजिंग वैरिएंट / साइज़ जोड़ें'
                      : '+ Add New Packaging Variant / Size'}
                  </span>
                </div>
                <p className="text-[11px] text-gray-600">
                  {language === 'mr'
                    ? 'उदा. १० किलो (10 kg), १२ किलो (12 kg), २५ किलो किंवा नवीन बॉटल साईज जोडा.'
                    : language === 'hi'
                    ? 'उदा. १० किलो (10 kg), १२ किलो (12 kg), २५ किलो या नया बॉटल साइज़ जोड़ें।'
                    : 'Add new packaging sizes like 10 kg, 12 kg, 25 kg, 500 ml along with its live price.'}
                </p>

                {newVariantError && (
                  <div className="text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 p-2 rounded-xl">
                    {newVariantError}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center gap-2.5">
                  <div className="relative flex-1 w-full">
                    <input
                      type="text"
                      value={newVariantName}
                      onChange={(e) => {
                        setNewVariantName(e.target.value);
                        setNewVariantError(null);
                      }}
                      placeholder={
                        language === 'mr'
                          ? 'व्हॅरिएंट साईज (उदा. 10 kg, 12 kg)'
                          : language === 'hi'
                          ? 'वैरिएंट साइज़ (उदा. 10 kg, 12 kg)'
                          : 'Variant Size (e.g. 10 kg, 12 kg)'
                      }
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 bg-white focus:outline-none focus:border-[#123814]"
                    />
                  </div>

                  <div className="relative w-full sm:w-36">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-gray-500 text-xs">
                      ₹
                    </span>
                    <input
                      type="number"
                      min="0"
                      value={newVariantPrice}
                      onChange={(e) => {
                        setNewVariantPrice(e.target.value);
                        setNewVariantError(null);
                      }}
                      placeholder="Rate (₹)"
                      className="w-full pl-7 pr-3 py-2 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 bg-white focus:outline-none focus:border-[#123814]"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleAddNewVariant}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black bg-[#E86A10] hover:bg-[#d05c0b] text-white shadow-xs transition-all active:scale-95 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>
                      {language === 'mr' ? 'जोडा (Add)' : language === 'hi' ? 'जोड़ें (Add)' : 'Add Size'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 sm:p-5 bg-white border-t border-gray-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  if (!modalIsSaving) setEditingProduct(null);
                }}
                disabled={modalIsSaving}
                className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                {language === 'mr' ? 'रद्द करा (Cancel)' : language === 'hi' ? 'रद्द करें (Cancel)' : 'Cancel'}
              </button>

              <div className="flex items-center gap-3">
                {modalSaveSuccess && (
                  <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-700 animate-fade-in">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {language === 'mr'
                        ? 'बदल यशस्वीरित्या सेव्ह झाले!'
                        : language === 'hi'
                        ? 'परिवर्तन सफलतापूर्वक सेव हो गए!'
                        : 'Saved to Database!'}
                    </span>
                  </span>
                )}

                <button
                  type="button"
                  onClick={handleModalSave}
                  disabled={modalIsSaving}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer shadow-md ${
                    modalSaveSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#123814] hover:bg-[#1c5520] text-white active:scale-95'
                  } disabled:opacity-50`}
                >
                  {modalIsSaving ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : modalSaveSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 text-[#E86A10]" />
                      <span>
                        {language === 'mr'
                          ? 'बदल सेव्ह करा (Save Changes)'
                          : language === 'hi'
                          ? 'परिवर्तन सेव करें (Save Changes)'
                          : 'Save Changes'}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
