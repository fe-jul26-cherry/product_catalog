import { useCallback, useState } from 'react';

import { ScrollTrigger } from '@/components/atoms/ScrollTrigger';
import { AsyncContent } from '@/components/molecules/AsyncContent';
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs';
import { Pagination } from '@/components/molecules/Pagination';
import { CatalogControls } from '@/components/organisms/CatalogControls';
import { ProductsList } from '@/components/organisms/ProductsList';
import {
  CATEGORIES,
  DEFAULT_PER_PAGE,
  DEFAULT_SORT,
  LOAD_MORE_STEP,
} from '@/constants';
import { useAsync, useLoadMore } from '@/hooks';
import { getProductsByCategory } from '@/services';

import styles from './CatalogPage.module.scss';

import type { Category, PerPage, SortBy } from '@/types';

interface CatalogPageProps {
  category: Category;
}

export const CatalogPage = ({ category }: CatalogPageProps) => {
  const [sortBy, setSortBy] = useState<SortBy>(DEFAULT_SORT);
  const [perPage, setPerPage] = useState<PerPage>(DEFAULT_PER_PAGE);
  const [page, setPage] = useState(1);

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

  const info = CATEGORIES.find(({ id }) => id === category);

  const filteredProducts = products ?? [];

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
    `${category}-${sortBy}`,
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
      <Breadcrumbs items={[{ label: info?.title ?? category }]} />

      <h1 className={styles.title}>{info?.title}</h1>
      {products && <p className={styles.count}>{products.length} models</p>}

      <CatalogControls
        sortBy={sortBy}
        perPage={perPage}
        onSortChange={setSortBy}
        onPerPageChange={setPerPage}
      />

      <AsyncContent
        isLoading={isLoading}
        error={error}
        onRetry={retry}
      >
        {visibleProducts.length === 0 ?
          <p className={styles.empty}>
            There are no models in this category yet.
          </p>
        : <>
            <ProductsList products={visibleProducts} />

            {isShowingAll && loadMore.hasMore && (
              <ScrollTrigger onReach={loadMore.loadMore} />
            )}

            {totalPages > 1 && (
              <Pagination
                current={page}
                total={totalPages}
                onChange={setPage}
              />
            )}
          </>
        }
      </AsyncContent>
    </div>
  );
};
