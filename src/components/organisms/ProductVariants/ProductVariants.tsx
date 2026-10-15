import { useState } from 'react';

import favoriteFilledIcon from '@/assets/icons/favorite-filled.svg';
import favoriteOutlineIcon from '@/assets/icons/favorite-outline.svg';
import { Button } from '@/components/atoms/Button';
import { CapacityButton } from '@/components/atoms/CapacityButton';
import { ColorSwatch } from '@/components/atoms/ColorSwatch';
import { Icon } from '@/components/atoms/Icon';
import { IconButton } from '@/components/atoms/IconButton';
import { ProductPrice } from '@/components/molecules/ProductPrice';
import { ProductSpecs } from '@/components/molecules/ProductSpecs';
import { getColorHex } from '@/constants';

import styles from './ProductVariants.module.scss';

import type { ProductDetails } from '@/types';
interface ProductVariantsProps {
  product: ProductDetails;
  onVariantChange: (color: string, capacity: string) => void;
  isInCart: boolean;
  onToggleCart: () => void;
}
export const ProductVariants = ({
  product,
  onVariantChange,
  isInCart,
  onToggleCart,
}: ProductVariantsProps) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const handleCartClick = () => {
    onToggleCart();
  };
  const handleFavouriteClick = () => {
    setIsFavourite((prev) => !prev);
  };
  return (
    <div className={styles.root}>
      <p className={styles.label}>Available colors</p>
      <div className={styles.options}>
        {product.colorsAvailable.map((color) => (
          <ColorSwatch
            key={color}
            color={getColorHex(color)}
            label={color}
            selected={color === product.color}
            onClick={() => onVariantChange(color, product.capacity)}
          />
        ))}
      </div>
      <p className={styles.label}>Select capacity</p>
      <div className={styles.options}>
        {product.capacityAvailable.map((capacity) => (
          <CapacityButton
            key={capacity}
            selected={capacity === product.capacity}
            onClick={() => onVariantChange(product.color, capacity)}
          >
            {capacity}
          </CapacityButton>
        ))}
      </div>
      <ProductPrice
        price={product.priceDiscount}
        fullPrice={product.priceRegular}
      />
      <div className={styles.actions}>
        <Button
          variant={isInCart ? 'selected' : 'primary'}
          className={styles.addToCart}
          onClick={handleCartClick}
        >
          {isInCart ? 'Added' : 'Add to cart'}
        </Button>
        <IconButton
          variant="favourite"
          added={isFavourite}
          className={styles.favourite}
          aria-label={
            isFavourite ? 'Remove from favourites' : 'Add to favourites'
          }
          onClick={handleFavouriteClick}
        >
          <Icon
            src={isFavourite ? favoriteFilledIcon : favoriteOutlineIcon}
            alt="favourite"
          />
        </IconButton>
      </div>
      <ProductSpecs
        specs={[
          { label: 'Screen', value: product.screen },
          { label: 'Resolution', value: product.resolution },
          { label: 'Processor', value: product.processor },
          { label: 'RAM', value: product.ram },
        ]}
      />
    </div>
  );
};
