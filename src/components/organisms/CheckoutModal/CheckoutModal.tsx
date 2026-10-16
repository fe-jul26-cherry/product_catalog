import { Modal } from '@/components/molecules/Modal';

import styles from './CheckoutModal.module.scss';

interface CheckoutModalProps {
  total: number;
  count: number;
  onClose: () => void;
}

export const CheckoutModal = ({
  total,
  count,
  onClose,
}: CheckoutModalProps) => (
  <Modal
    title="Checkout"
    onClose={onClose}
  >
    <section className={styles.summary}>
      <p className={styles.total}>${total}</p>
      <p className={styles.count}>Total for {count} items</p>
    </section>
  </Modal>
);
