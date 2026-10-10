import styles from './ProductPrice.module.scss';

interface ProductPriceProps {
  price: number;
  fullPrice?: number;
}

export const ProductPrice = ({ price, fullPrice }: ProductPriceProps) => (
  <p className={styles.root}>
    <span className={styles.price}>${price}</span>
    {fullPrice && fullPrice !== price && (
      <s className={styles.fullPrice}>${fullPrice}</s>
    )}
  </p>
);
