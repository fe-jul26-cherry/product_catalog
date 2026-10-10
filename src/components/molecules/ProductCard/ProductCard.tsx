import { Link } from 'react-router-dom';

import { Button } from '@/components/atoms/Button';
import { IconButton } from '@/components/atoms/IconButton';
import { ProductPrice } from '@/components/molecules/ProductPrice';
import { ProductSpecs } from '@/components/molecules/ProductSpecs';
import { getProductPath } from '@/constants';

import styles from './ProductCard.module.scss';

import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const path = getProductPath(product.itemId);

  return (
    <article className={styles.root}>
      <Link
        to={path}
        className={styles.imageLink}
      >
        <img
          className={styles.image}
          src={product.image}
          alt={product.name}
        />
      </Link>

      <Link
        to={path}
        className={styles.title}
      >
        {product.name}
      </Link>

      <ProductPrice
        price={product.price}
        fullPrice={product.fullPrice}
      />

      <ProductSpecs
        specs={[
          { label: 'Screen', value: product.screen },
          { label: 'Capacity', value: product.capacity },
          { label: 'RAM', value: product.ram },
        ]}
      />

      <div className={styles.actions}>
        <Button>Add to cart</Button>
        <IconButton
          variant="favourite"
          aria-label="Add to favourites"
        />
      </div>
    </article>
  );
};
