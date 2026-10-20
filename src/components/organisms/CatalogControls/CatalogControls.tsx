import filtersIcon from '@/assets/icons/filters.svg';
import { Icon } from '@/components/atoms/Icon';
import { Dropdown } from '@/components/molecules/Dropdown';
import { PER_PAGE_VALUES, SORT_VALUES } from '@/constants';
import { useTranslation } from '@/hooks';

import styles from './CatalogControls.module.scss';

import type { PerPage, SortBy } from '@/types';

interface CatalogControlsProps {
  sortBy: SortBy;
  perPage: PerPage;
  onSortChange: (value: SortBy) => void;
  onPerPageChange: (value: PerPage) => void;
  filtersCount: number;
  onOpenFilters: () => void;
}

export const CatalogControls = ({
  sortBy,
  perPage,
  onSortChange,
  onPerPageChange,
  filtersCount,
  onOpenFilters,
}: CatalogControlsProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.root}>
      <button
        type="button"
        className={styles.filters}
        onClick={onOpenFilters}
      >
        <Icon
          src={filtersIcon}
          alt=""
        />
        {t.filters.open}
        {filtersCount > 0 && (
          <span className={styles.badge}>{filtersCount}</span>
        )}
      </button>
      <Dropdown
        description={t.catalog.sortBy}
        options={SORT_VALUES.map((value) => ({
          value,
          label: t.catalog.sort[value],
        }))}
        value={sortBy}
        onChange={(value) => onSortChange(value as SortBy)}
      />
      <Dropdown
        description={t.catalog.itemsOnPage}
        options={PER_PAGE_VALUES.map((value) => ({
          value,
          label: value === 'all' ? t.catalog.all : value,
        }))}
        value={perPage}
        onChange={(value) => onPerPageChange(value as PerPage)}
      />
    </div>
  );
};
