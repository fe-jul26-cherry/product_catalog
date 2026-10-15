import { ProductCard } from '@/components/molecules/ProductCard';
import { useProductActions } from '@/hooks';

import styles from './ProductsList.module.scss';

import type { Product } from '@/types';

interface ProductsListProps {
  products: Product[];
}

export const ProductsList = ({ products }: ProductsListProps) => {
  const { isInCart, isFavourite, toggleCart, toggleFavourite } =
    useProductActions();

  return (
    <ul className={styles.root}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard
            product={product}
            isInCart={isInCart(product.itemId)}
            isFavourite={isFavourite(product.itemId)}
            onToggleCart={() => toggleCart(product)}
            onToggleFavourite={() => toggleFavourite(product)}
          />
        </li>
      ))}
    </ul>
  );
};
