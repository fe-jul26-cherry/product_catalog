import { ProductPrice } from '@/components/molecules/ProductPrice';
import { QuantityCounter } from '@/components/molecules/QuantityCounter';

import styles from './CartItem.module.scss';

import type { CartItem as CartItemType } from '@/types';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => (
  <article className={styles.root}>
    <button
      type="button"
      className={styles.remove}
      aria-label="Remove from cart"
    />
    <img
      className={styles.image}
      src={item.product.image}
      alt={item.product.name}
    />
    <p className={styles.title}>{item.product.name}</p>
    <QuantityCounter
      value={item.quantity}
      onDecrease={() => {}}
      onIncrease={() => {}}
    />
    <ProductPrice price={item.product.price * item.quantity} />
  </article>
);
