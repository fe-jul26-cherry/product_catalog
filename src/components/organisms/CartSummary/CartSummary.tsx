import { Button } from '@/components/atoms/Button';

import styles from './CartSummary.module.scss';

interface CartSummaryProps {
  total: number;
  count: number;
  onCheckout: () => void;
}

export const CartSummary = ({ total, count, onCheckout }: CartSummaryProps) => (
  <aside className={styles.root}>
    <p className={styles.total}>${total}</p>
    <p className={styles.count}>Total for {count} items</p>
    <Button
      className={styles.button}
      onClick={onCheckout}
    >
      Checkout
    </Button>
  </aside>
);
