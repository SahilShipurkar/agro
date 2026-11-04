import { supabase, isSupabaseConfigured } from './supabase';
import type { StoreProduct } from './productsData';

export interface CustomPriceRecord {
  id: string; // canonical product id (e.g. 'milk1', 'sarkhi', 'navmin')
  name?: string;
  basePrice: number;
  variantPrices: Record<string, number>;
  updatedAt?: string;
}

const STORAGE_KEY = 'navbharat_custom_prices';

// Helper to extract a language-agnostic canonical ID from product
export function getProductCanonicalKey(prod: StoreProduct | string): string {
  if (typeof prod === 'string') {
    return prod.trim().toLowerCase().replace(/\s+/g, '-');
  }
  if (prod.image) {
    const imgKey = prod.image.split('/').pop()?.split('.')[0]?.toLowerCase();
    if (imgKey) return imgKey;
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

// Fetch all prices from Supabase and cache locally
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
      data.forEach((row: any) => {
        if (row.id) {
          liveMap[row.id] = {
            id: row.id,
            name: row.name,
            basePrice: Number(row.base_price ?? row.basePrice),
            variantPrices: row.variant_prices ?? row.variantPrices ?? {},
            updatedAt: row.updated_at,
          };
        }
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(liveMap));
      window.dispatchEvent(new Event('navbharat_prices_updated'));
      return liveMap;
    }
  } catch (err) {
    console.warn('Error fetching live prices from Supabase:', err);
  }

  return cached;
}

// Save / Update a product's price in Supabase + local cache
export async function saveLivePrice(
  canonicalId: string,
  productName: string,
  basePrice: number,
  variantPrices: Record<string, number>,
  variantsList: string[] = []
): Promise<{ success: boolean; error?: string }> {
  // Store both original variant keys AND indexed keys (idx_0, idx_1) so English & Marathi both update
  const enrichedVariantPrices: Record<string, number> = { ...variantPrices };
  variantsList.forEach((variantName, idx) => {
    if (variantPrices[variantName] !== undefined) {
      enrichedVariantPrices[`idx_${idx}`] = variantPrices[variantName];
    }
  });

  // 1. Update localStorage immediately
  const current = getLocalCachedPrices();
  current[canonicalId] = {
    id: canonicalId,
    name: productName,
    basePrice,
    variantPrices: enrichedVariantPrices,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
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

// Merge live prices onto the static products array (handles Marathi & English)
export function applyLivePrices(
  products: StoreProduct[],
  customPrices: Record<string, CustomPriceRecord>
): StoreProduct[] {
  return products.map((prod) => {
    const canonicalKey = getProductCanonicalKey(prod);
    const nameKey = prod.name.trim().toLowerCase().replace(/\s+/g, '-');
    const custom = customPrices[canonicalKey] || customPrices[nameKey] || customPrices[prod.name];

    if (!custom) return prod;

    const updatedVariantPrices: Record<string, number> = { ...prod.variantPrices };

    // Apply by variant name or by index (idx_0, idx_1) for cross-language sync
    if (custom.variantPrices) {
      Object.entries(custom.variantPrices).forEach(([vKey, vPrice]) => {
        if (vKey.startsWith('idx_')) {
          const idx = parseInt(vKey.replace('idx_', ''), 10);
          if (!isNaN(idx) && prod.variants && prod.variants[idx]) {
            updatedVariantPrices[prod.variants[idx]] = vPrice;
          }
        } else if (updatedVariantPrices[vKey] !== undefined) {
          updatedVariantPrices[vKey] = vPrice;
        }
      });
    }

    return {
      ...prod,
      price: custom.basePrice ?? prod.price,
      variantPrices: updatedVariantPrices,
    };
  });
}
