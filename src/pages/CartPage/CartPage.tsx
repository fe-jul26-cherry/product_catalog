import { useNavigate } from 'react-router-dom';

import { BackLink } from '@/components/atoms/BackLink';
import { CartItem } from '@/components/molecules/CartItem';
import { CartSummary } from '@/components/organisms/CartSummary';
import { selectCartCount, selectCartTotal, useCartStore } from '@/store';

import styles from './CartPage.module.scss';

export const CartPage = () => {
  const navigate = useNavigate();

  const items = useCartStore((state) => state.items);
  const total = useCartStore(selectCartTotal);
  const count = useCartStore(selectCartCount);
  const { remove, increment, decrement, clear } = useCartStore.getState();

  const handleCheckout = () => {
    if (
      window.confirm(
        'Checkout is not implemented yet. Do you want to clear the cart?',
      )
    ) {
      clear();
    }
  };

  return (
    <div className={styles.root}>
      <BackLink onClick={() => navigate(-1)}>Back</BackLink>
      <h1 className={styles.title}>Cart</h1>

      {items.length === 0 ?
        <p className={styles.empty}>Your cart is empty</p>
      : <div className={styles.content}>
          <ul className={styles.list}>
            {items.map((item) => (
              <li key={item.id}>
                <CartItem
                  item={item}
                  onDecrease={() => decrement(item.id)}
                  onIncrease={() => increment(item.id)}
                  onRemove={() => remove(item.id)}
                />
              </li>
            ))}
          </ul>

          <CartSummary
            total={total}
            count={count}
            onCheckout={handleCheckout}
          />
        </div>
      }
    </div>
  );
};
