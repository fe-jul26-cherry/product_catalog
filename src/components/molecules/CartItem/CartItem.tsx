import closeIcon from '@/assets/icons/close.svg';
import { Icon } from '@/components/atoms/Icon';
import { ProductPrice } from '@/components/molecules/ProductPrice';
import { QuantityCounter } from '@/components/molecules/QuantityCounter';

import styles from './CartItem.module.scss';

import type { CartItem as CartItemType } from '@/types';

interface CartItemProps {
  item: CartItemType;
  onDecrease: () => void;
  onIncrease: () => void;
  onRemove: () => void;
}

export const CartItem = ({
  item,
  onDecrease,
  onIncrease,
  onRemove,
}: CartItemProps) => (
  <article className={styles.root}>
    <button
      type="button"
      className={styles.remove}
      aria-label="Remove from cart"
      onClick={onRemove}
    >
      <Icon
        src={closeIcon}
        alt="Close"
      />
    </button>
    <img
      className={styles.image}
      src={item.product.image}
      alt={item.product.name}
    />
    <p className={styles.title}>{item.product.name}</p>
    <div className={styles.counter}>
      <QuantityCounter
        value={item.quantity}
        onDecrease={onDecrease}
        onIncrease={onIncrease}
      />
    </div>
    <div className={styles.price}>
      <ProductPrice price={item.product.price * item.quantity} />
    </div>
  </article>
);
