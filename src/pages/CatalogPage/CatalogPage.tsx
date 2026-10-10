import { useState } from 'react';

import { Breadcrumbs } from '@/components/molecules/Breadcrumbs';
import { Pagination } from '@/components/molecules/Pagination';
import { CatalogControls } from '@/components/organisms/CatalogControls';
import { ProductsList } from '@/components/organisms/ProductsList';
import { CATEGORIES, DEFAULT_PER_PAGE, DEFAULT_SORT } from '@/constants';
import { mockProducts } from '@/mocks';

import styles from './CatalogPage.module.scss';

import type { Category, PerPage, SortBy } from '@/types';

interface CatalogPageProps {
  category: Category;
}

export const CatalogPage = ({ category }: CatalogPageProps) => {
  const [sortBy, setSortBy] = useState<SortBy>(DEFAULT_SORT);
  const [perPage, setPerPage] = useState<PerPage>(DEFAULT_PER_PAGE);
  const [page, setPage] = useState(1);

  const info = CATEGORIES.find(({ id }) => id === category);
  const products = mockProducts.filter((p) => p.category === category);

  return (
    <div className={styles.root}>
      <Breadcrumbs items={[{ label: info?.title ?? category }]} />
      <h1 className={styles.title}>{info?.title}</h1>
      <p className={styles.count}>{products.length} models</p>

      <CatalogControls
        sortBy={sortBy}
        perPage={perPage}
        onSortChange={setSortBy}
        onPerPageChange={setPerPage}
      />

      <ProductsList products={products} />

      <Pagination
        current={page}
        total={4}
        onChange={setPage}
      />
    </div>
  );
};
