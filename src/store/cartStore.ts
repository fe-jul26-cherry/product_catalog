import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  add: (product: Product) => void;
  remove: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      add: (product) => {
        const { items } = get();
        const stringId = String(product.id);
        const existingItem = items.find((item) => item.id === stringId);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === stringId ?
                { ...item, quantity: item.quantity + 1 }
              : item,
            ),
          });
        } else {
          set({
            items: [...items, { id: stringId, quantity: 1, product }],
          });
        }
      },

      remove: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        });
      },

      increment: (id) => {
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        });
      },

      decrement: (id) => {
        set({
          items: get().items.map((item) =>
            item.id === id ?
              { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
            : item,
          ),
        });
      },
    }),
    {
      name: 'cart',
    },
  ),
);
