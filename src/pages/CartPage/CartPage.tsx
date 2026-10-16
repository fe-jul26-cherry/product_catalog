import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BackLink } from '@/components/atoms/BackLink';
import { CartItem } from '@/components/molecules/CartItem';
import { CartSummary } from '@/components/organisms/CartSummary';
import { CheckoutModal } from '@/components/organisms/CheckoutModal';
import { selectCartCount, selectCartTotal, useCartStore } from '@/store';

import styles from './CartPage.module.scss';

export const CartPage = () => {
  const navigate = useNavigate();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const items = useCartStore((state) => state.items);
  const total = useCartStore(selectCartTotal);
  const count = useCartStore(selectCartCount);
  const { remove, increment, decrement, clear } = useCartStore.getState();

  const handleCheckout = () => setIsCheckoutOpen(true);

  const handleCloseCheckout = () => setIsCheckoutOpen(false);

  const handleSubmitOrder = () => clear();

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

      {isCheckoutOpen && (
        <CheckoutModal
          total={total}
          count={count}
          onSubmit={handleSubmitOrder}
          onClose={handleCloseCheckout}
        />
      )}
    </div>
  );
};
