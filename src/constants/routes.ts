export const ROUTES = {
  HOME: '/',
  PHONES: '/phones',
  TABLETS: '/tablets',
  ACCESSORIES: '/accessories',
  PRODUCT: '/product/:productId',
  CART: '/cart',
  FAVORITES: '/favorites',
  UI_KIT: '/ui-kit',
  NOT_FOUND: '*',
} as const;

export const getProductPath = (productId: string) => `/product/${productId}`;
