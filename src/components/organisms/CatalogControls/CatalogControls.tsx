import { Dropdown } from '@/components/molecules/Dropdown';
import { PER_PAGE_OPTIONS, SORT_OPTIONS } from '@/constants';

import styles from './CatalogControls.module.scss';

import type { PerPage, SortBy } from '@/types';

interface CatalogControlsProps {
  sortBy: SortBy;
  perPage: PerPage;
  onSortChange: (value: SortBy) => void;
  onPerPageChange: (value: PerPage) => void;
}

export const CatalogControls = ({
  sortBy,
  perPage,
  onSortChange,
  onPerPageChange,
}: CatalogControlsProps) => (
  <div className={styles.root}>
    <Dropdown
      description="Sort by"
      options={SORT_OPTIONS}
      value={sortBy}
      onChange={(value) => onSortChange(value as SortBy)}
    />
    <Dropdown
      description="Items on page"
      options={PER_PAGE_OPTIONS}
      value={perPage}
      onChange={(value) => onPerPageChange(value as PerPage)}
    />
  </div>
);
