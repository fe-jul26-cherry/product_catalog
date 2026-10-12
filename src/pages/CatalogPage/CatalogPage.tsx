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
  const filteredProducts = mockProducts.filter(
    (product) => product.category === category,
  );

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

  const itemsPerPage =
    perPage === 'all' ? sortedProducts.length : Number(perPage);
  const startIndex = (page - 1) * itemsPerPage;
  const visibleProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const totalPages =
    perPage === 'all' ? 1 : Math.ceil(sortedProducts.length / itemsPerPage);

  return (
    <div className={styles.root}>
      <Breadcrumbs items={[{ label: info?.title ?? category }]} />
      <h1 className={styles.title}>{info?.title}</h1>
      <p className={styles.count}>{filteredProducts.length} models</p>

      <CatalogControls
        sortBy={sortBy}
        perPage={perPage}
        onSortChange={setSortBy}
        onPerPageChange={setPerPage}
      />

      <ProductsList products={visibleProducts} />

      <Pagination
        current={page}
        total={totalPages}
        onChange={setPage}
      />
    </div>
  );
};
