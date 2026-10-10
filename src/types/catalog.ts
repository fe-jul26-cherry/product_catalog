export type SortBy = 'age' | 'title' | 'price';

export type PerPage = '4' | '8' | '16' | 'all';

export interface Option<T extends string = string> {
  value: T;
  label: string;
}
