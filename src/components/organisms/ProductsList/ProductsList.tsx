import { ProductCard } from '@/components/molecules/ProductCard';

import styles from './ProductsList.module.scss';

import type { Product } from '@/types';

interface ProductsListProps {
  products: Product[];
}

export const ProductsList = ({ products }: ProductsListProps) => (
  <ul className={styles.root}>
    {products.map((product) => (
      <li key={product.id}>
        <ProductCard product={product} />
      </li>
    ))}
  </ul>
);
