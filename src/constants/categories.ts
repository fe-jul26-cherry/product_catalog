import { ROUTES } from './routes';

import type { Category } from '@/types';

export interface CategoryInfo {
  id: Category;
  title: string;
  path: string;
  image: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'phones',
    title: 'Mobile phones',
    path: ROUTES.PHONES,
    image: 'img/category-phones.png',
  },
  {
    id: 'tablets',
    title: 'Tablets',
    path: ROUTES.TABLETS,
    image: 'img/category-tablets.png',
  },
  {
    id: 'accessories',
    title: 'Accessories',
    path: ROUTES.ACCESSORIES,
    image: 'img/category-accessories.png',
  },
];
