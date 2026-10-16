import { useState } from 'react';

import { Button } from '@/components/atoms/Button';
import { Modal } from '@/components/molecules/Modal';
import {
  CHECKOUT_FIELDS,
  CHECKOUT_INITIAL_VALUES,
  DELIVERY_OPTIONS,
} from '@/constants';

import styles from './CheckoutModal.module.scss';

import type { CheckoutFormValues } from '@/types';
import type { ChangeEvent, FormEvent } from 'react';

interface CheckoutModalProps {
  total: number;
  count: number;
  onClose: () => void;
}

export const CheckoutModal = ({
  total,
  count,
  onClose,
}: CheckoutModalProps) => {
  const [values, setValues] = useState<CheckoutFormValues>(
    CHECKOUT_INITIAL_VALUES,
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

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
        {CHECKOUT_FIELDS.map(({ name, label, type, autoComplete }) => (
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
              onChange={handleChange}
            />
          </label>
        ))}

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
