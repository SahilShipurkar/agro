import { useState, useEffect } from 'react';
import {
  ArrowLeft,
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
} from 'lucide-react';
import GlobalNavbar from './GlobalNavbar';
import { getStoreProducts, type StoreProduct } from '@/lib/productsData';
import {
  fetchLivePrices,
  saveLivePrice,
  getLocalCachedPrices,
  getProductKey,
  type CustomPriceRecord,
} from '@/lib/priceStore';
import { logoutAdmin, ADMIN_EMAIL } from './AdminLoginModal';
import { isSupabaseConfigured } from '@/lib/supabase';
import { getAssetUrl } from '@/lib/utils';

interface AdminDashboardProps {
  onBackToHome: () => void;
  onNavigateStore: () => void;
}

interface EditablePriceState {
  basePrice: number;
  variantPrices: Record<string, number>;
}

export default function AdminDashboard({ onBackToHome, onNavigateStore }: AdminDashboardProps) {
  const [products] = useState<StoreProduct[]>(() => getStoreProducts('mr'));
  const [customPrices, setCustomPrices] = useState<Record<string, CustomPriceRecord>>(() =>
    getLocalCachedPrices()
  );
  const [editedPrices, setEditedPrices] = useState<Record<string, EditablePriceState>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [savedSuccessKey, setSavedSuccessKey] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<string>('Checking sync...');
  const [rlsError, setRlsError] = useState<string | null>(null);
  const [sqlCopied, setSqlCopied] = useState(false);

  // Initialize editable prices from custom or default
  useEffect(() => {
    const initial: Record<string, EditablePriceState> = {};
    products.forEach((prod) => {
      const key = getProductKey(prod);
      const custom = customPrices[key] || customPrices[prod.name];
      initial[key] = {
        basePrice: custom ? custom.basePrice : prod.price,
        variantPrices: custom ? { ...prod.variantPrices, ...custom.variantPrices } : { ...prod.variantPrices },
      };
    });
    setEditedPrices(initial);
  }, [products, customPrices]);

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
  }, []);

  // Filter products by search and category
  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleBasePriceChange = (productKey: string, newPrice: number) => {
    setEditedPrices((prev) => ({
      ...prev,
      [productKey]: {
        ...prev[productKey],
        basePrice: isNaN(newPrice) ? 0 : newPrice,
      },
    }));
  };

  const handleVariantPriceChange = (productKey: string, variantName: string, newPrice: number) => {
    setEditedPrices((prev) => ({
      ...prev,
      [productKey]: {
        ...prev[productKey],
        variantPrices: {
          ...prev[productKey]?.variantPrices,
          [variantName]: isNaN(newPrice) ? 0 : newPrice,
        },
      },
    }));
  };

  const handleSaveProduct = async (product: StoreProduct) => {
    const key = getProductKey(product);
    const edit = editedPrices[key];
    if (!edit) return;

    setSavingKey(key);
    setRlsError(null);

    try {
      const res = await saveLivePrice(
        key,
        product.name,
        edit.basePrice,
        edit.variantPrices,
        product.variants
      );

      if (!res.success) {
        setRlsError(
          res.error || 'Row Level Security (RLS) is preventing changes from saving to Supabase for all users.'
        );
      } else {
        setRlsError(null);
        setCustomPrices((prev) => ({
          ...prev,
          [key]: {
            id: key,
            basePrice: edit.basePrice,
            variantPrices: edit.variantPrices,
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
    <div className="min-h-screen bg-[#F4F9F4] text-gray-900 font-sans pb-16">
      {/* GLOBAL NAVBAR AT TOP */}
      <GlobalNavbar
        currentPage="admin"
        onNavigateHome={onBackToHome}
        onNavigateStore={onNavigateStore}
        sticky={true}
      />

      {/* Admin Action Sub-Bar */}
      <div className="w-full bg-white/95 backdrop-blur-md border-b border-[#123814]/15 shadow-xs py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-600 hover:text-[#123814] px-2.5 py-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>वेबसाईट पहा (Website)</span>
            </button>
            <div className="h-4 w-px bg-gray-300 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {syncStatus}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateStore}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#123814] bg-[#EFFDF0] hover:bg-[#dff7e1] border border-[#123814]/20 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#E86A10]" />
              <span>स्टोअर उघडा</span>
            </button>
            <div className="text-right hidden md:block">
              <p className="text-xs font-black text-[#123814] leading-none">{ADMIN_EMAIL}</p>
              <p className="text-[10px] text-gray-500 font-medium">Main Admin</p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">लॉगआउट</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* RLS Policy Warning Banner (if Supabase blocked the save) */}
        {rlsError && (
          <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-5 mb-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-fade-in">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-950">
                  Supabase Security Policy Required (किंमत सर्व ग्राहकांसाठी सेव्ह करण्यासाठी १ सेटिंग आवश्यक):
                </h4>
                <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                  Supabase मधील Row-Level Security (RLS) पॉलिसीमुळे किमती डेटाबेसमध्ये सेव्ह होत नाहीत. खालील SQL कमांड Supabase च्या <strong>SQL Editor</strong> मध्ये पेस्ट करून <strong>Run</strong> करा:
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

        {/* Page Title & Hero Banner */}
        <div className="bg-gradient-to-r from-[#123814] to-[#1c5520] rounded-3xl p-6 sm:p-8 text-white shadow-lg mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-bold mb-3 backdrop-blur-xs">
              <ShieldCheck className="w-4 h-4 text-[#E86A10]" />
              <span>Navbharat Agro Admin Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              उत्पादन किमती व्यवस्थापन (Product Price Manager)
            </h1>
            <p className="text-sm text-emerald-100/90 mt-1 max-w-xl">
              येथून तुम्ही उत्पादनांची मूळ किंमत व विविध पॅकिंग साइजच्या किमती बदलू शकता. सेव्ह केल्यानंतर नवीन किमती संपूर्ण स्टोअरवर थेट दिसतील.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/15">
            <div className="text-center">
              <p className="text-2xl font-black">{products.length}</p>
              <p className="text-[11px] text-emerald-200 font-medium">एकूण उत्पादने</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <p className="text-2xl font-black text-[#E86A10]">
                {Object.keys(customPrices).length}
              </p>
              <p className="text-[11px] text-emerald-200 font-medium">बदललेल्या किमती</p>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-gray-200/80 mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="उत्पादनाचे नाव शोधा (Search product name)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#123814] focus:ring-2 focus:ring-[#123814]/15"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#123814] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const key = getProductKey(product);
            const editState = editedPrices[key] || {
              basePrice: product.price,
              variantPrices: product.variantPrices,
            };
            const isSaving = savingKey === key;
            const isSaved = savedSuccessKey === key;
            const hasCustom = Boolean(customPrices[key]);

            return (
              <div
                key={key}
                className="bg-white rounded-3xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col"
              >
                {/* Product Header */}
                <div className="p-5 flex items-start gap-3.5 border-b border-gray-100">
                  <div className="w-16 h-16 rounded-2xl bg-[#EFFDF0] border border-[#123814]/10 p-1.5 flex items-center justify-center shrink-0">
                    <img
                      src={getAssetUrl(product.image)}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#123814] bg-[#EFFDF0] px-2 py-0.5 rounded-md border border-[#123814]/10 truncate">
                        {product.category}
                      </span>
                      {hasCustom && (
                        <span className="text-[9px] font-bold text-[#E86A10] bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200">
                          Customized
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-black text-gray-900 mt-1 truncate">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">{product.subtitle}</p>
                  </div>
                </div>

                {/* Pricing Fields */}
                <div className="p-5 flex-1 flex flex-col gap-4">
                  {/* Base Price */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5 text-gray-400" />
                        <span>मूळ किंमत (Base Price):</span>
                      </span>
                      <span className="text-[10px] text-gray-400 font-normal">
                        Default: ₹{product.price}
                      </span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-gray-500">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={editState.basePrice}
                        onChange={(e) => handleBasePriceChange(key, parseFloat(e.target.value))}
                        className="w-full pl-8 pr-3 py-2 rounded-xl border border-gray-300 font-bold text-base text-[#123814] focus:outline-none focus:border-[#123814] focus:ring-2 focus:ring-[#123814]/20"
                      />
                    </div>
                  </div>

                  {/* Packaging Variant Prices (if any) */}
                  {product.variants && product.variants.length > 0 && (
                    <div className="pt-2 border-t border-gray-100">
                      <label className="block text-xs font-bold text-gray-700 mb-2 flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-gray-400" />
                        <span>पॅकिंग साइज किमती (Variant Prices):</span>
                      </label>
                      <div className="space-y-2">
                        {product.variants.map((variant) => {
                          const vPrice =
                            editState.variantPrices?.[variant] ??
                            product.variantPrices?.[variant] ??
                            editState.basePrice;
                          return (
                            <div
                              key={variant}
                              className="flex items-center justify-between gap-2 p-2 rounded-xl bg-gray-50 border border-gray-200"
                            >
                              <span className="text-xs font-semibold text-gray-700 truncate">
                                {variant}
                              </span>
                              <div className="relative w-28 shrink-0">
                                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500">
                                  ₹
                                </span>
                                <input
                                  type="number"
                                  min="0"
                                  value={vPrice}
                                  onChange={(e) =>
                                    handleVariantPriceChange(
                                      key,
                                      variant,
                                      parseFloat(e.target.value)
                                    )
                                  }
                                  className="w-full pl-6 pr-2 py-1 text-xs font-bold text-gray-900 rounded-lg border border-gray-300 bg-white focus:outline-none focus:border-[#123814]"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Save Button */}
                <div className="p-4 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between gap-3">
                  <div className="text-[11px] text-gray-500">
                    {isSaved ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold animate-fade-in">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>किंमत Supabase मध्ये सेव्ह झाली!</span>
                      </span>
                    ) : (
                      <span>बदलांसाठी सेव्ह करा</span>
                    )}
                  </div>

                  <button
                    onClick={() => handleSaveProduct(product)}
                    disabled={isSaving}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
                      isSaved
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#123814] hover:bg-[#1c5520] text-white active:scale-95'
                    } disabled:opacity-50`}
                  >
                    {isSaving ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Updating...</span>
                      </>
                    ) : isSaved ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Saved</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Price</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
