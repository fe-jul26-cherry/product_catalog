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
  isInCart: boolean;
  isFavourite: boolean;
  onToggleCart: () => void;
  onToggleFavourite: () => void;
}

export const ProductCard = ({
  product,
  isInCart,
  isFavourite,
  onToggleCart,
  onToggleFavourite,
}: ProductCardProps) => {
  const path = getProductPath(product.itemId);

  const handleCartClick = (event: React.MouseEvent) => {
    event.preventDefault();
    onToggleCart();
  };

  const handleFavouriteClick = (event: React.MouseEvent) => {
    event.preventDefault();
    onToggleFavourite();
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
          loading="lazy"
          decoding="async"
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
          className={[styles.cartButton, isInCart && styles.cartButtonAdded]
            .filter(Boolean)
            .join(' ')}
          variant={isInCart ? 'selected' : 'primary'}
          onClick={handleCartClick}
        >
          {isInCart ?
            <span className={styles.cartLabelAdded}>Added</span>
          : 'Add to cart'}
        </Button>

        <IconButton
          variant="favourite"
          added={isFavourite}
          aria-label={
            isFavourite ? 'Remove from favourites' : 'Add to favourites'
          }
          onClick={handleFavouriteClick}
        >
          <span
            className={[styles.heart, isFavourite && styles.heartActive]
              .filter(Boolean)
              .join(' ')}
          >
            <Icon
              src={isFavourite ? heartFilledIcon : heartIcon}
              alt="favourite"
            />
          </span>
        </IconButton>
      </div>
    </article>
  );
};
