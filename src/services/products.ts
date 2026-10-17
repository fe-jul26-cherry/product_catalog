import { client } from './fetchClient';
import { isSupabaseConfigured, supabase } from './supabase';

import type {
  Category,
  Language,
  Product,
  ProductDetails,
  ProductRow,
  ProductWithTranslationsRow,
} from '@/types';

const SLIDER_SIZE = 10;

export interface ProductWithDetails {
  category: Category;
  product: Product;
  details: ProductDetails;
}

const PRODUCT_COLUMNS =
  'id,item_id,category,name,full_price,price,screen,capacity,color,ram,year,image';

const toProduct = (row: ProductRow): Product => ({
  id: row.id,
  category: row.category,
  itemId: row.item_id,
  name: row.name,
  fullPrice: row.full_price,
  price: row.price,
  screen: row.screen ?? '',
  capacity: row.capacity,
  color: row.color,
  ram: row.ram ?? '',
  year: row.year,
  image: row.image,
});

const toProductWithDetails = (
  row: ProductWithTranslationsRow,
): ProductWithDetails => {
  const translation = row.product_translations[0];

  return {
    category: row.category,
    product: toProduct(row),
    details: {
      id: row.item_id,
      namespaceId: row.namespace_id,
      name: row.name,
      capacityAvailable: row.capacity_available,
      capacity: row.capacity,
      priceRegular: row.full_price,
      priceDiscount: row.price,
      colorsAvailable: row.colors_available,
      color: row.color,
      images: row.images,
      description: translation?.description ?? [],
      screen: row.screen ?? '',
      resolution: row.resolution ?? '',
      processor: row.processor ?? '',
      ram: row.ram ?? '',
      camera: row.camera ?? undefined,
      zoom: translation?.zoom ?? undefined,
      cell: translation?.cell ?? [],
    },
  };
};

const withFallback = async <T>(
  primary: () => Promise<T>,
  fallback: () => Promise<T>,
): Promise<T> => {
  if (!isSupabaseConfigured) {
    return fallback();
  }

  try {
    return await primary();
  } catch {
    return fallback();
  }
};

let productsRequest: Promise<Product[]> | null = null;
const detailsRequests = new Map<string, Promise<ProductDetails[]>>();

export const getProducts = (): Promise<Product[]> => {
  if (!productsRequest) {
    productsRequest = withFallback(
      async () => {
        const rows = await supabase.select<ProductRow[]>(
          'products',
          `select=${PRODUCT_COLUMNS}&order=id`,
        );

        return rows.map(toProduct);
      },
      () => client.get<Product[]>('/products.json'),
    ).catch((error) => {
      productsRequest = null;
      throw error;
    });
  }

  return productsRequest;
};

const getDetailsFile = (category: Category, language: Language) =>
  language === 'ua' ? `/${category}.ua.json` : `/${category}.json`;

const getDetailsList = (
  category: Category,
  language: Language,
): Promise<ProductDetails[]> => {
  const file = getDetailsFile(category, language);
  const cached = detailsRequests.get(file);

  if (cached) {
    return cached;
  }

  const request = client.get<ProductDetails[]>(file).catch((error) => {
    detailsRequests.delete(file);
    throw error;
  });

  detailsRequests.set(file, request);

  return request;
};

export const getProductsByCategory = async (
  category: Category,
): Promise<Product[]> => {
  const products = await getProducts();

  return products.filter((product) => product.category === category);
};

export const getNewProducts = async (): Promise<Product[]> => {
  const products = await getProducts();

  return [...products].sort((a, b) => b.year - a.year).slice(0, SLIDER_SIZE);
};

export const getHotPriceProducts = async (): Promise<Product[]> => {
  const products = await getProducts();

  return [...products]
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, SLIDER_SIZE);
};

export const getSuggestedProducts = async (
  namespaceId: string,
): Promise<Product[]> => {
  const products = await getProducts();

  return products
    .filter((product) => !product.itemId.startsWith(`${namespaceId}-`))
    .map((product) => ({ product, order: Math.random() }))
    .sort((a, b) => a.order - b.order)
    .slice(0, SLIDER_SIZE)
    .map(({ product }) => product);
};

export const getCategoryCounts = async (): Promise<
  Record<Category, number>
> => {
  const products = await getProducts();
  const counts: Record<Category, number> = {
    phones: 0,
    tablets: 0,
    accessories: 0,
  };

  products.forEach((product) => {
    counts[product.category] += 1;
  });

  return counts;
};

const getProductDetailsFromJson = async (
  itemId: string,
  language: Language,
): Promise<ProductWithDetails | null> => {
  const products = await getProducts();
  const product = products.find((item) => item.itemId === itemId);

  if (!product) {
    return null;
  }

  const list = await getDetailsList(product.category, language);
  const details = list.find((item) => item.id === itemId);

  return details ? { category: product.category, product, details } : null;
};

const getProductDetailsFromSupabase = async (
  itemId: string,
  language: Language,
): Promise<ProductWithDetails | null> => {
  const rows = await supabase.select<ProductWithTranslationsRow[]>(
    'products',
    `select=*,product_translations(language,zoom,cell,description)&item_id=eq.${encodeURIComponent(itemId)}&product_translations.language=eq.${language}`,
  );

  return rows[0] ? toProductWithDetails(rows[0]) : null;
};

export const getProductDetails = (
  itemId: string,
  language: Language,
): Promise<ProductWithDetails | null> =>
  withFallback(
    () => getProductDetailsFromSupabase(itemId, language),
    () => getProductDetailsFromJson(itemId, language),
  );
