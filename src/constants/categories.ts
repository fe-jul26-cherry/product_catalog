import { ROUTES } from './routes';

import type { Category } from '@/types';

export interface CategoryInfo {
  id: Category;
  path: string;
  image: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'phones',
    path: ROUTES.PHONES,
    image: 'img/category/category-phones.png',
  },
  {
    id: 'tablets',
    path: ROUTES.TABLETS,
    image: 'img/category/category-tablets.png',
  },
  {
    id: 'accessories',
    path: ROUTES.ACCESSORIES,
    image: 'img/category/category-accessories.png',
  },
];
