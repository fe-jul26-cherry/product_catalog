import { Button } from '@/components/atoms/Button';
import { CapacityButton } from '@/components/atoms/CapacityButton';
import { ColorSwatch } from '@/components/atoms/ColorSwatch';
import { IconButton } from '@/components/atoms/IconButton';
import { ProductPrice } from '@/components/molecules/ProductPrice';
import { ProductSpecs } from '@/components/molecules/ProductSpecs';
import { getColorHex } from '@/constants';

import styles from './ProductVariants.module.scss';

import type { ProductDetails } from '@/types';

interface ProductVariantsProps {
  product: ProductDetails;
}

export const ProductVariants = ({ product }: ProductVariantsProps) => (
  <div className={styles.root}>
    <p className={styles.label}>Available colors</p>
    <div className={styles.options}>
      {product.colorsAvailable.map((color) => (
        <ColorSwatch
          key={color}
          color={getColorHex(color)}
          label={color}
          selected={color === product.color}
        />
      ))}
    </div>

    <p className={styles.label}>Select capacity</p>
    <div className={styles.options}>
      {product.capacityAvailable.map((capacity) => (
        <CapacityButton
          key={capacity}
          selected={capacity === product.capacity}
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
      <Button>Add to cart</Button>
      <IconButton
        variant="favourite"
        aria-label="Add to favourites"
      />
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
