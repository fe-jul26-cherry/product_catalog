import { useId, useState } from 'react';

import { Button } from '@/components/atoms/Button';
import { Modal } from '@/components/molecules/Modal';
import {
  CHECKOUT_FIELDS,
  CHECKOUT_INITIAL_VALUES,
  DELIVERY_OPTIONS,
} from '@/constants';
import { validateCheckout } from '@/utils';

import styles from './CheckoutModal.module.scss';

import type { CheckoutErrors, CheckoutFormValues } from '@/types';
import type { ChangeEvent, FormEvent } from 'react';

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
  const [values, setValues] = useState<CheckoutFormValues>(
    CHECKOUT_INITIAL_VALUES,
  );
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateCheckout(values);

    setErrors(nextErrors);

    const firstInvalid = CHECKOUT_FIELDS.find(({ name }) => nextErrors[name]);

    if (firstInvalid) {
      const element = event.currentTarget.elements.namedItem(firstInvalid.name);

      if (element instanceof HTMLElement) {
        element.focus();
      }

      return;
    }

    onSubmit(values);
    setSubmittedName(values.name.trim());
  };

  if (submittedName !== null) {
    return (
      <Modal
        title="Order placed"
        onClose={onClose}
      >
        <div className={styles.success}>
          <p className={styles.successText}>
            Thank you, {submittedName}! Your order has been placed.
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
