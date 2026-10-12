import { useState } from 'react';
import { Link } from 'react-router-dom';

import heartFilledIcon from '@/assets/icons/favorite-filled.svg';
import heartIcon from '@/assets/icons/favorite-outline.svg';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
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

  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  const handleCartClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsAddedToCart((prev) => !prev);
  };

  const handleFavouriteClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsFavourite((prev) => !prev);
  };

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

      <div className={styles.priceContainer}>
        <ProductPrice
          price={product.price}
          fullPrice={product.fullPrice}
        />
      </div>

      <div className={styles.divider} />

      <ProductSpecs
        specs={[
          { label: 'Screen', value: product.screen },
          { label: 'Capacity', value: product.capacity },
          { label: 'RAM', value: product.ram },
        ]}
      />

      <div className={styles.actions}>
        <Button
          variant={isAddedToCart ? 'selected' : 'primary'}
          onClick={handleCartClick}
        >
          {isAddedToCart ? 'Added' : 'Add to cart'}
        </Button>

        <IconButton
          variant="favourite"
          added={isFavourite}
          aria-label="Add to favourites"
          onClick={handleFavouriteClick}
        >
          <Icon
            src={isFavourite ? heartFilledIcon : heartIcon}
            alt="favourite"
          />
        </IconButton>
      </div>
    </article>
  );
};
