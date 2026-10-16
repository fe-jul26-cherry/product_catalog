import { useId } from 'react';

import { Button } from '@/components/atoms/Button';
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
  const formId = useId();
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
        {CHECKOUT_FIELDS.map(({ name, label, type, autoComplete }) => {
          const error = errors[name];
          const errorId = `${formId}-${name}`;

          return (
            <label
              key={name}
              className={styles.field}
            >
              <span className={styles.label}>{label}</span>
              <input
                className={styles.input}
                name={name}
                type={type}
                autoComplete={autoComplete}
                value={values[name]}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? errorId : undefined}
                onChange={handleChange}
              />
              {error && (
                <span
                  id={errorId}
                  className={styles.error}
                  role="alert"
                >
                  {error}
                </span>
              )}
            </label>
          );
        })}

        <fieldset className={styles.delivery}>
          <legend className={styles.label}>Delivery</legend>
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
