import { client } from './fetchClient';

import type { Category, Language, Product, ProductDetails } from '@/types';

const SLIDER_SIZE = 10;

export interface ProductWithDetails {
  category: Category;
  product: Product;
  details: ProductDetails;
}

let productsRequest: Promise<Product[]> | null = null;
const detailsRequests = new Map<string, Promise<ProductDetails[]>>();

export const getProducts = (): Promise<Product[]> => {
  if (!productsRequest) {
    productsRequest = client.get<Product[]>('/products.json').catch((error) => {
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

export const getProductDetails = async (
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
