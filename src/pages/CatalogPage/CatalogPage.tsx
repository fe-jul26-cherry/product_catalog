import { useCallback, useState } from 'react';

import { Button } from '@/components/atoms/Button';
import { ScrollTrigger } from '@/components/atoms/ScrollTrigger';
import { AsyncContent } from '@/components/molecules/AsyncContent';
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs';
import { Modal } from '@/components/molecules/Modal';
import { Pagination } from '@/components/molecules/Pagination';
import { CatalogControls } from '@/components/organisms/CatalogControls';
import { CatalogFilters } from '@/components/organisms/CatalogFilters';
import { ProductsList } from '@/components/organisms/ProductsList';
import { DEFAULT_PER_PAGE, DEFAULT_SORT, LOAD_MORE_STEP } from '@/constants';
import {
  useAsync,
  useCatalogFilters,
  useLoadMore,
  useTranslation,
} from '@/hooks';
import { getProductsByCategory } from '@/services';

import styles from './CatalogPage.module.scss';

import type { Category, PerPage, SortBy } from '@/types';

interface CatalogPageProps {
  category: Category;
}

export const CatalogPage = ({ category }: CatalogPageProps) => {
  const { t } = useTranslation();
  const [sortBy, setSortBy] = useState<SortBy>(DEFAULT_SORT);
  const [perPage, setPerPage] = useState<PerPage>(DEFAULT_PER_PAGE);
  const [page, setPage] = useState(1);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const [prevCategory, setPrevCategory] = useState<Category>(category);
  const [prevPerPage, setPrevPerPage] = useState<PerPage>(perPage);

  if (category !== prevCategory) {
    setPrevCategory(category);
    setPage(1);
  }

  if (perPage !== prevPerPage) {
    setPrevPerPage(perPage);
    setPage(1);
  }

  const load = useCallback(() => getProductsByCategory(category), [category]);
  const { data: products, error, isLoading, retry } = useAsync(load);

  const {
    selection,
    catalog,
    filtered: filteredProducts,
    activeCount,
    signature,
    setPrice,
    toggle,
    reset,
  } = useCatalogFilters(category, products);

  const [prevSignature, setPrevSignature] = useState(signature);

  if (signature !== prevSignature) {
    setPrevSignature(signature);
    setPage(1);
  }

  const title = t.categories[category];

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'age':
        return b.year - a.year;
      case 'title':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.price - b.price;
      default:
        return 0;
    }
  });

  const isShowingAll = perPage === 'all';
  const loadMore = useLoadMore(
    sortedProducts.length,
    LOAD_MORE_STEP,
    `${category}-${sortBy}-${signature}`,
  );

  const itemsPerPage = isShowingAll ? loadMore.count : Number(perPage);
  const startIndex = isShowingAll ? 0 : (page - 1) * itemsPerPage;
  const visibleProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const totalPages =
    isShowingAll ? 1 : Math.ceil(sortedProducts.length / itemsPerPage);

  return (
    <div className={styles.root}>
      <Breadcrumbs
        items={[{ label: title }]}
        label={t.header.breadcrumbs}
        homeLabel={t.common.home}
      />

      <h1 className={styles.title}>{title}</h1>
      <p className={styles.count}>
        {products ? t.catalog.models(filteredProducts.length) : '\u00A0'}
      </p>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          {catalog && (
            <CatalogFilters
              category={category}
              catalog={catalog}
              selection={selection}
              activeCount={activeCount}
              onPriceChange={setPrice}
              onToggle={toggle}
              onReset={reset}
            />
          )}
        </aside>

        <div className={styles.content}>
          <CatalogControls
            sortBy={sortBy}
            perPage={perPage}
            onSortChange={setSortBy}
            onPerPageChange={setPerPage}
            filtersCount={activeCount}
            onOpenFilters={() => setIsFiltersOpen(true)}
          />

          <AsyncContent
            isLoading={isLoading}
            error={error}
            onRetry={retry}
            labels={t.status}
          >
            {visibleProducts.length === 0 ?
              <div className={styles.emptyState}>
                <p className={styles.empty}>
                  {activeCount > 0 ? t.filters.noResults : t.catalog.empty}
                </p>
                {activeCount > 0 && (
                  <Button
                    variant="selected"
                    onClick={reset}
                  >
                    {t.filters.resetFilters}
                  </Button>
                )}
              </div>
            : <>
                <ProductsList
                  products={visibleProducts}
                  withSidebar
                />

                {isShowingAll && loadMore.hasMore && (
                  <ScrollTrigger onReach={loadMore.loadMore} />
                )}

                {totalPages > 1 && (
                  <Pagination
                    current={page}
                    total={totalPages}
                    onChange={setPage}
                    labels={{
                      pagination: t.catalog.pagination,
                      previous: t.catalog.previousPage,
                      next: t.catalog.nextPage,
                    }}
                  />
                )}
              </>
            }
          </AsyncContent>
        </div>
      </div>

      {isFiltersOpen && catalog && (
        <Modal
          title={t.filters.title}
          closeLabel={t.common.close}
          onClose={() => setIsFiltersOpen(false)}
        >
          <CatalogFilters
            plain
            category={category}
            catalog={catalog}
            selection={selection}
            activeCount={activeCount}
            onPriceChange={setPrice}
            onToggle={toggle}
            onReset={reset}
          />
          <Button
            className={styles.apply}
            onClick={() => setIsFiltersOpen(false)}
          >
            {`${t.filters.apply} (${filteredProducts.length})`}
          </Button>
        </Modal>
      )}
    </div>
  );
};
