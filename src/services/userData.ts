import { PRODUCT_COLUMNS, toProduct } from './products';
import { supabaseClient } from './supabaseClient';

import type { CartItem, Product, ProductRow } from '@/types';

interface CartRow {
  item_id: string;
  quantity: number;
  products: ProductRow | null;
}

interface FavoriteRow {
  products: ProductRow | null;
}

const CART_TABLE = 'cart_items';
const FAVORITES_TABLE = 'favorites';
const CONFLICT_TARGET = 'user_id,item_id';

const getClient = () => {
  if (!supabaseClient) {
    throw new Error('Supabase is not configured.');
  }

  return supabaseClient;
};

export const fetchCart = async (): Promise<CartItem[]> => {
  const { data, error } = await getClient()
    .from(CART_TABLE)
    .select(`item_id,quantity,products(${PRODUCT_COLUMNS})`)
    .order('updated_at');

  if (error) {
    throw error;
  }

  return (data as unknown as CartRow[]).flatMap((row) =>
    row.products ?
      [
        {
          id: row.item_id,
          quantity: row.quantity,
          product: toProduct(row.products),
        },
      ]
    : [],
  );
};

export const saveCartItems = async (
  items: { id: string; quantity: number }[],
): Promise<void> => {
  if (items.length === 0) {
    return;
  }

  const { error } = await getClient()
    .from(CART_TABLE)
    .upsert(
      items.map((item) => ({ item_id: item.id, quantity: item.quantity })),
      { onConflict: CONFLICT_TARGET },
    );

  if (error) {
    throw error;
  }
};

export const removeCartItems = async (itemIds: string[]): Promise<void> => {
  if (itemIds.length === 0) {
    return;
  }

  const { error } = await getClient()
    .from(CART_TABLE)
    .delete()
    .in('item_id', itemIds);

  if (error) {
    throw error;
  }
};

export const fetchFavorites = async (): Promise<Product[]> => {
  const { data, error } = await getClient()
    .from(FAVORITES_TABLE)
    .select(`item_id,products(${PRODUCT_COLUMNS})`)
    .order('created_at');

  if (error) {
    throw error;
  }

  return (data as unknown as FavoriteRow[]).flatMap((row) =>
    row.products ? [toProduct(row.products)] : [],
  );
};

export const saveFavorites = async (itemIds: string[]): Promise<void> => {
  if (itemIds.length === 0) {
    return;
  }

  const { error } = await getClient()
    .from(FAVORITES_TABLE)
    .upsert(
      itemIds.map((itemId) => ({ item_id: itemId })),
      { onConflict: CONFLICT_TARGET, ignoreDuplicates: true },
    );

  if (error) {
    throw error;
  }
};

export const removeFavorites = async (itemIds: string[]): Promise<void> => {
  if (itemIds.length === 0) {
    return;
  }

  const { error } = await getClient()
    .from(FAVORITES_TABLE)
    .delete()
    .in('item_id', itemIds);

  if (error) {
    throw error;
  }
};
