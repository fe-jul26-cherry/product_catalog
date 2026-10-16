import type { PerPage, SortBy } from '@/types';

export const SORT_VALUES: SortBy[] = ['age', 'title', 'price'];

export const PER_PAGE_VALUES: PerPage[] = ['4', '8', '16', 'all'];

export const DEFAULT_SORT: SortBy = 'age';
export const DEFAULT_PER_PAGE: PerPage = '16';
export const DEFAULT_PAGE = 1;
export const LOAD_MORE_STEP = 12;
