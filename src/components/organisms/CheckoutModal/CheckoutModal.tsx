import { Button } from '@/components/atoms/Button';
import { FormField } from '@/components/molecules/FormField';
import { Modal } from '@/components/molecules/Modal';
import { CHECKOUT_FIELDS, DELIVERY_OPTIONS } from '@/constants';
import { useCheckoutForm } from '@/hooks';

import styles from './CheckoutModal.module.scss';

import type { CheckoutFormValues } from '@/types';

interface CheckoutModalProps {
  total: number;
  count: number;
  onSubmit: (values: CheckoutFormValues) => void;
  onClose: () => void;
}

export const CheckoutModal = ({
  total,
  count,
  onSubmit,
  onClose,
}: CheckoutModalProps) => {
  const { values, errors, isSubmitted, handleChange, handleSubmit } =
    useCheckoutForm(onSubmit);

  if (isSubmitted) {
    return (
      <Modal
        title="Order placed"
        onClose={onClose}
      >
        <div className={styles.success}>
          <p className={styles.successText}>
            Thank you, {values.name.trim()}! Your order has been placed.
          </p>
          <Button
            className={styles.submit}
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      title="Checkout"
      onClose={onClose}
    >
      <section className={styles.summary}>
        <p className={styles.total}>${total}</p>
        <p className={styles.count}>Total for {count} items</p>
      </section>

      <form
        className={styles.form}
        noValidate
        onSubmit={handleSubmit}
      >
        {CHECKOUT_FIELDS.map((field) => (
          <FormField
            key={field.name}
            {...field}
            value={values[field.name]}
            error={errors[field.name]}
            onChange={handleChange}
          />
        ))}

        <fieldset className={styles.delivery}>
          <legend className={styles.legend}>Delivery</legend>{' '}
          <div className={styles.options}>
            {DELIVERY_OPTIONS.map(({ value, label }) => (
              <label
                key={value}
                className={styles.option}
              >
                <input
                  className={styles.radio}
                  type="radio"
                  name="delivery"
                  value={value}
                  checked={values.delivery === value}
                  onChange={handleChange}
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        <Button
          className={styles.submit}
          type="submit"
        >
          Place order
        </Button>
      </form>
    </Modal>
  );
};
