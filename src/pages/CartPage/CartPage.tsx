import { useNavigate } from 'react-router-dom';

import { BackLink } from '@/components/atoms/BackLink';
import { CartItem } from '@/components/molecules/CartItem';
import { CartSummary } from '@/components/organisms/CartSummary';
import { mockProducts } from '@/mocks';

import styles from './CartPage.module.scss';

import type { CartItem as CartItemType } from '@/types';

const mockCart: CartItemType[] = mockProducts.slice(0, 3).map((product) => ({
  id: product.itemId,
  quantity: 1,
  product,
}));

export const CartPage = () => {
  const navigate = useNavigate();
  const total = mockCart.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0,
  );

  return (
    <div className={styles.root}>
      <BackLink onClick={() => navigate(-1)}>Back</BackLink>
      <h1 className={styles.title}>Cart</h1>

      <div className={styles.content}>
        <ul className={styles.list}>
          {mockCart.map((item) => (
            <li key={item.id}>
              <CartItem item={item} />
            </li>
          ))}
        </ul>

        <CartSummary
          total={total}
          count={mockCart.length}
          onCheckout={() => {}}
        />
      </div>
    </div>
  );
};
