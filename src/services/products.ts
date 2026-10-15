import { client } from './fetchClient';

import type { Category, Product, ProductDetails } from '@/types';

const SLIDER_SIZE = 10;

export interface ProductWithDetails {
  category: Category;
  product: Product;
  details: ProductDetails;
}

let productsRequest: Promise<Product[]> | null = null;
const detailsRequests = new Map<Category, Promise<ProductDetails[]>>();

export const getProducts = (): Promise<Product[]> => {
  if (!productsRequest) {
    productsRequest = client.get<Product[]>('/products.json').catch((error) => {
      productsRequest = null;
      throw error;
    });
  }

  return productsRequest;
};

const getDetailsList = (category: Category): Promise<ProductDetails[]> => {
  const cached = detailsRequests.get(category);

  if (cached) {
    return cached;
  }

  const request = client
    .get<ProductDetails[]>(`/${category}.json`)
    .catch((error) => {
      detailsRequests.delete(category);
      throw error;
    });

  detailsRequests.set(category, request);

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
): Promise<ProductWithDetails | null> => {
  const products = await getProducts();
  const product = products.find((item) => item.itemId === itemId);

  if (!product) {
    return null;
  }

  const list = await getDetailsList(product.category);
  const details = list.find((item) => item.id === itemId);

  return details ? { category: product.category, product, details } : null;
};
