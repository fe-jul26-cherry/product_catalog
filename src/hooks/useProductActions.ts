import { useCartStore } from '@/store';

export const useProductActions = () => {
  const cartItems = useCartStore((state) => state.items);
  const toggleCart = useCartStore((state) => state.toggle);

  return {
    isInCart: (itemId: string) => cartItems.some((item) => item.id === itemId),
    toggleCart,
  };
};
