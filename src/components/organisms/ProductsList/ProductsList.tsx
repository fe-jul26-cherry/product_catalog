import { ProductCard } from '@/components/molecules/ProductCard';
import { useProductActions } from '@/hooks';

import styles from './ProductsList.module.scss';

import type { Product } from '@/types';

interface ProductsListProps {
  products: Product[];
}

export const ProductsList = ({ products }: ProductsListProps) => {
  const { isInCart, toggleCart } = useProductActions();

  return (
    <ul className={styles.root}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard
            key={product.id}
            product={product}
            isInCart={isInCart(product.itemId)}
            onToggleCart={() => toggleCart(product)}
          />
        </li>
      ))}
    </ul>
  );
};
