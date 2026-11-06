import { supabase, isSupabaseConfigured } from './supabase';
import type { StoreProduct } from './productsData';

export interface ProductOffer {
  enabled: boolean;
  discountPercent?: number;
  offerPrice?: number;
  badgeText?: string;
}

export interface CustomPriceRecord {
  id: string; // canonical product id (e.g. 'milk1', 'sarkhi', 'navmin')
  name?: string;
  image?: string;
  subtitle?: string;
  description?: string;
  category?: string;
  basePrice: number;
  variantPrices: Record<string, number>;
  variants?: string[];
  inStock?: boolean;
  variantStock?: Record<string, boolean>;
  offer?: ProductOffer;
  variantOffers?: Record<string, ProductOffer>;
  updatedAt?: string;
}

const STORAGE_KEY = 'navbharat_custom_prices';
const CUSTOM_PRODUCTS_KEY = 'navbharat_custom_created_products';

// Helper to extract a language-agnostic canonical ID from product
export function getProductCanonicalKey(prod: StoreProduct | string): string {
  if (typeof prod === 'string') {
    return prod.trim().toLowerCase().replace(/\s+/g, '-');
  }
  if (prod.image) {
    const imgKey = prod.image.split('/').pop()?.split('.')[0]?.toLowerCase();
    if (imgKey && !imgKey.startsWith('data:')) return imgKey;
  }
  return prod.name.trim().toLowerCase().replace(/\s+/g, '-');
}

export function getProductKey(prodOrName: StoreProduct | string): string {
  return getProductCanonicalKey(prodOrName);
}

// Read local cache synchronously
export function getLocalCachedPrices(): Record<string, CustomPriceRecord> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.warn('Failed to parse local cached prices:', err);
    return {};
  }
}

// Read custom created products from localStorage
export function getCustomCreatedProducts(): StoreProduct[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CUSTOM_PRODUCTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('Failed to parse custom created products:', err);
    return [];
  }
}

// Fetch all prices and product metadata from Supabase and cache locally
export async function fetchLivePrices(): Promise<Record<string, CustomPriceRecord>> {
  const cached = getLocalCachedPrices();

  if (!isSupabaseConfigured) {
    return cached;
  }

  try {
    const { data, error } = await supabase
      .from('product_prices')
      .select('*');

    if (error) {
      console.warn('Supabase product_prices fetch warning:', error.message);
      return cached;
    }

    if (data && Array.isArray(data)) {
      const liveMap: Record<string, CustomPriceRecord> = { ...cached };
      const customProducts = getCustomCreatedProducts();
      let customProductsUpdated = false;

      data.forEach((row: any) => {
        if (row.id) {
          const rawVariantPrices = row.variant_prices ?? row.variantPrices ?? {};
          const meta = rawVariantPrices.__meta || {};

          // Check if row contains a custom created full product
          if (meta.isCustomProduct && meta.fullProduct) {
            const prodKey = getProductKey(meta.fullProduct);
            const exists = customProducts.some((p) => getProductKey(p) === prodKey);
            if (!exists) {
              customProducts.push(meta.fullProduct);
              customProductsUpdated = true;
            }
          }

          liveMap[row.id] = {
            id: row.id,
            name: row.name,
            image: meta.image,
            subtitle: meta.subtitle,
            description: meta.description,
            category: meta.category,
            basePrice: Number(row.base_price ?? row.basePrice),
            variantPrices: rawVariantPrices,
            variants: meta.variants || [],
            inStock: meta.inStock ?? row.in_stock ?? true,
            variantStock: meta.variantStock ?? row.variant_stock ?? {},
            offer: meta.offer ?? row.offer,
            variantOffers: meta.variantOffers ?? row.variant_offers ?? {},
            updatedAt: row.updated_at,
          };
        }
      });

      if (customProductsUpdated) {
        localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(customProducts));
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(liveMap));
      window.dispatchEvent(new Event('navbharat_prices_updated'));
      return liveMap;
    }
  } catch (err) {
    console.warn('Error fetching live prices from Supabase:', err);
  }

  return cached;
}

// Save / Update a product's price, stock, variants, and offer details in Supabase + local cache
export async function saveLivePrice(
  canonicalId: string,
  productName: string,
  basePrice: number,
  variantPrices: Record<string, number>,
  variantsList: string[] = [],
  inStock: boolean = true,
  variantStock: Record<string, boolean> = {},
  offer?: ProductOffer,
  variantOffers?: Record<string, ProductOffer>,
  extraMeta?: { image?: string; subtitle?: string; description?: string; category?: string }
): Promise<{ success: boolean; error?: string }> {
  // Store both original variant keys AND indexed keys (idx_0, idx_1) so English & Marathi both update
  const enrichedVariantPrices: Record<string, any> = { ...variantPrices };
  const enrichedVariantStock: Record<string, boolean> = { ...variantStock };
  const enrichedVariantOffers: Record<string, ProductOffer> = { ...(variantOffers || {}) };

  variantsList.forEach((variantName, idx) => {
    if (variantPrices[variantName] !== undefined) {
      enrichedVariantPrices[`idx_${idx}`] = variantPrices[variantName];
    }
    if (variantStock[variantName] !== undefined) {
      enrichedVariantStock[`idx_${idx}`] = variantStock[variantName];
    }
    if (variantOffers && variantOffers[variantName]) {
      enrichedVariantOffers[`idx_${idx}`] = variantOffers[variantName];
    }
  });

  // Pack metadata inside __meta so it requires no SQL table schema migration
  enrichedVariantPrices.__meta = {
    name: productName,
    variants: variantsList,
    inStock,
    variantStock: enrichedVariantStock,
    offer,
    variantOffers: enrichedVariantOffers,
    ...(extraMeta || {}),
  };

  // 1. Update localStorage immediately
  const current = getLocalCachedPrices();
  current[canonicalId] = {
    id: canonicalId,
    name: productName,
    image: extraMeta?.image || current[canonicalId]?.image,
    subtitle: extraMeta?.subtitle || current[canonicalId]?.subtitle,
    description: extraMeta?.description || current[canonicalId]?.description,
    category: extraMeta?.category || current[canonicalId]?.category,
    basePrice,
    variantPrices: enrichedVariantPrices,
    variants: variantsList,
    inStock,
    variantStock: enrichedVariantStock,
    offer,
    variantOffers: enrichedVariantOffers,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));

  // Sync to custom created products if this product is one
  const customProducts = getCustomCreatedProducts();
  const cpIndex = customProducts.findIndex((p) => getProductKey(p) === canonicalId);
  if (cpIndex !== -1) {
    customProducts[cpIndex] = {
      ...customProducts[cpIndex],
      name: productName,
      image: extraMeta?.image || customProducts[cpIndex].image,
      subtitle: extraMeta?.subtitle || customProducts[cpIndex].subtitle,
      description: extraMeta?.description || customProducts[cpIndex].description,
      category: extraMeta?.category || customProducts[cpIndex].category,
      price: basePrice,
      variants: variantsList,
      variantPrices,
      inStock,
      variantStock,
      offer,
      variantOffers,
    };
    localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(customProducts));
  }

  window.dispatchEvent(new Event('navbharat_prices_updated'));

  // 2. Sync to Supabase table
  if (isSupabaseConfigured) {
    try {
      const { error } = await supabase
        .from('product_prices')
        .upsert(
          {
            id: canonicalId,
            name: productName,
            base_price: basePrice,
            variant_prices: enrichedVariantPrices,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'id' }
        );

      if (error) {
        console.error('Supabase upsert error:', error);
        return { success: false, error: error.message };
      }
    } catch (err: any) {
      console.error('Supabase save error:', err);
      return { success: false, error: err.message };
    }
  }

  return { success: true };
}

// Create and register a brand new product
export async function saveNewProduct(product: StoreProduct): Promise<{ success: boolean; error?: string }> {
  const canonicalId = getProductKey(product);

  // 1. Save to local custom created products list
  const currentCustom = getCustomCreatedProducts();
  const filtered = currentCustom.filter((p) => getProductKey(p) !== canonicalId);
  filtered.push(product);
  localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(filtered));

  // 2. Prepare live price record
  const enrichedVariantPrices: Record<string, any> = { ...product.variantPrices };
  const enrichedVariantStock: Record<string, boolean> = { ...(product.variantStock || {}) };

  product.variants.forEach((v, idx) => {
    if (product.variantPrices[v] !== undefined) {
      enrichedVariantPrices[`idx_${idx}`] = product.variantPrices[v];
    }
    if (product.variantStock && product.variantStock[v] !== undefined) {
      enrichedVariantStock[`idx_${idx}`] = product.variantStock[v];
    } else {
      enrichedVariantStock[v] = true;
      enrichedVariantStock[`idx_${idx}`] = true;
    }
  });

  enrichedVariantPrices.__meta = {
    isCustomProduct: true,
    fullProduct: product,
    variants: product.variants,
    inStock: product.inStock !== false,
    variantStock: enrichedVariantStock,
    offer: product.offer,
    variantOffers: product.variantOffers,
  };

  // Update local price cache
  const cachedPrices = getLocalCachedPrices();
  cachedPrices[canonicalId] = {
    id: canonicalId,
    name: product.name,
    basePrice: product.price,
    variantPrices: enrichedVariantPrices,
    variants: product.variants,
    inStock: product.inStock !== false,
    variantStock: enrichedVariantStock,
    offer: product.offer,
    variantOffers: product.variantOffers,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cachedPrices));

  // 3. Sync to Supabase table
  if (isSupabaseConfigured) {
    try {
      const { error } = await supabase
        .from('product_prices')
        .upsert(
          {
            id: canonicalId,
            name: product.name,
            base_price: product.price,
            variant_prices: enrichedVariantPrices,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'id' }
        );

      if (error) {
        console.error('Supabase upsert error for new product:', error);
      }
    } catch (err) {
      console.error('Supabase new product save error:', err);
    }
  }

  window.dispatchEvent(new Event('navbharat_prices_updated'));
  return { success: true };
}

// Merge live prices onto the static products array (handles Marathi, Hindi & English, plus newly added products)
export function applyLivePrices(
  products: StoreProduct[],
  customPrices: Record<string, CustomPriceRecord>
): StoreProduct[] {
  // Combine base products + custom created products
  const customProducts = getCustomCreatedProducts();
  const allProducts: StoreProduct[] = [...products];

  customProducts.forEach((cp) => {
    const cpKey = getProductKey(cp);
    if (!allProducts.some((p) => getProductKey(p) === cpKey)) {
      allProducts.push(cp);
    }
  });

  return allProducts.map((prod) => {
    const canonicalKey = getProductCanonicalKey(prod);
    const nameKey = prod.name.trim().toLowerCase().replace(/\s+/g, '-');
    const custom = customPrices[canonicalKey] || customPrices[nameKey] || customPrices[prod.name];

    if (!custom) return prod;

    // Build the updated variants list:
    // Start with current product's base variants
    const updatedVariants = [...prod.variants];
    if (custom.variants && Array.isArray(custom.variants)) {
      custom.variants.forEach((v) => {
        // Append newly added custom variants if not already in the list
        if (!updatedVariants.includes(v) && !v.startsWith('idx_')) {
          updatedVariants.push(v);
        }
      });
    }

    const updatedVariantPrices: Record<string, number> = { ...prod.variantPrices };
    const updatedVariantStock: Record<string, boolean> = { ...(prod.variantStock || {}) };
    const updatedVariantOffers: Record<string, ProductOffer> = { ...(prod.variantOffers || {}) };

    // Apply variant prices by name or by positional index (idx_0, idx_1)
    if (custom.variantPrices) {
      Object.entries(custom.variantPrices).forEach(([vKey, vPrice]) => {
        if (vKey === '__meta') return;
        if (vKey.startsWith('idx_')) {
          const idx = parseInt(vKey.replace('idx_', ''), 10);
          if (!isNaN(idx) && updatedVariants[idx]) {
            updatedVariantPrices[updatedVariants[idx]] = vPrice as number;
          }
        } else {
          updatedVariantPrices[vKey] = vPrice as number;
        }
      });
    }

    // Apply variant stock by name or by positional index (idx_0, idx_1)
    if (custom.variantStock) {
      Object.entries(custom.variantStock).forEach(([vKey, isAvailable]) => {
        if (vKey === '__meta') return;
        if (vKey.startsWith('idx_')) {
          const idx = parseInt(vKey.replace('idx_', ''), 10);
          if (!isNaN(idx) && updatedVariants[idx]) {
            updatedVariantStock[updatedVariants[idx]] = isAvailable;
          }
        } else {
          updatedVariantStock[vKey] = isAvailable;
        }
      });
    }

    // Apply variant offers by name or by positional index (idx_0, idx_1)
    if (custom.variantOffers) {
      Object.entries(custom.variantOffers).forEach(([vKey, vOffer]) => {
        if (vKey === '__meta') return;
        if (vKey.startsWith('idx_')) {
          const idx = parseInt(vKey.replace('idx_', ''), 10);
          if (!isNaN(idx) && updatedVariants[idx]) {
            updatedVariantOffers[updatedVariants[idx]] = vOffer;
          }
        } else {
          updatedVariantOffers[vKey] = vOffer;
        }
      });
    }

    // Apply offer discount to base price if enabled
    let effectivePrice = custom.basePrice ?? prod.price;
    if (updatedVariants.length > 0 && updatedVariantPrices[updatedVariants[0]]) {
      effectivePrice = updatedVariantPrices[updatedVariants[0]];
    }

    const firstOffer = updatedVariants.length > 0 ? updatedVariantOffers[updatedVariants[0]] : null;
    if (firstOffer?.enabled && firstOffer.discountPercent) {
      effectivePrice = Math.round(
        effectivePrice - (effectivePrice * firstOffer.discountPercent) / 100
      );
    } else if (custom.offer?.enabled && custom.offer.discountPercent) {
      effectivePrice = Math.round(
        effectivePrice - (effectivePrice * custom.offer.discountPercent) / 100
      );
    }

    return {
      ...prod,
      name: custom.name || prod.name,
      image: custom.image || prod.image,
      subtitle: custom.subtitle || prod.subtitle,
      description: custom.description || custom.subtitle || prod.description,
      category: custom.category || prod.category,
      price: effectivePrice,
      variants: updatedVariants,
      variantPrices: updatedVariantPrices,
      inStock: custom.inStock !== false,
      variantStock: updatedVariantStock,
      offer: custom.offer,
      variantOffers: updatedVariantOffers,
    };
  });
}
