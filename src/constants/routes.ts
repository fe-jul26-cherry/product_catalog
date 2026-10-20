export const ROUTES = {
  HOME: '/',
  PHONES: '/phones',
  TABLETS: '/tablets',
  ACCESSORIES: '/accessories',
  SEARCH: '/search',
  PRODUCT: '/product/:productId',
  CART: '/cart',
  FAVORITES: '/favorites',
  TEAM: '/team',
  UI_KIT: '/ui-kit',
  NOT_FOUND: '*',
} as const;

export const CATALOG_ROUTES: string[] = [
  ROUTES.PHONES,
  ROUTES.TABLETS,
  ROUTES.ACCESSORIES,
];

export const getProductPath = (productId: string) => `/product/${productId}`;

export const getSearchPath = (query: string) =>
  `${ROUTES.SEARCH}?query=${encodeURIComponent(query)}`;
