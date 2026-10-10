import { ProductCard } from '@/components/molecules/ProductCard';

import styles from './ProductsSlider.module.scss';

import type { Product } from '@/types';

interface ProductsSliderProps {
  title: string;
  products: Product[];
}

export const ProductsSlider = ({ title, products }: ProductsSliderProps) => (
  <section className={styles.root}>
    <h2 className={styles.title}>{title}</h2>
    <ul className={styles.track}>
      {products.map((product) => (
        <li
          key={product.id}
          className={styles.slide}
        >
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  </section>
);
