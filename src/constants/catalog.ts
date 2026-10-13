import type { Option, PerPage, SortBy } from '@/types';

export const SORT_OPTIONS: Option<SortBy>[] = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

export const PER_PAGE_OPTIONS: Option<PerPage>[] = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'All' },
];

export const DEFAULT_SORT: SortBy = 'age';
export const DEFAULT_PER_PAGE: PerPage = '16';
export const DEFAULT_PAGE = 1;
export const LOAD_MORE_STEP = 12;
