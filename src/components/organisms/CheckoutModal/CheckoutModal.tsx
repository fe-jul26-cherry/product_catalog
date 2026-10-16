import { Button } from '@/components/atoms/Button';
import { Dropdown } from '@/components/molecules/Dropdown';
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
            value={values[field.name as keyof CheckoutFormValues]}
            error={errors[field.name as keyof CheckoutFormValues]}
            onChange={handleChange}
          />
        ))}

        <fieldset className={styles.delivery}>
          <legend className={styles.legend}>Delivery method</legend>
          <div className={styles.options}>
            {DELIVERY_OPTIONS.map(({ value, label }) => {
              const isChecked = values.delivery === value;

              return (
                <div
                  key={value}
                  className={`${styles.option} ${isChecked ? styles.optionActive : ''}`}
                >
                  <label className={styles.optionHeader}>
                    <input
                      className={styles.radio}
                      type="radio"
                      name="delivery"
                      value={value}
                      checked={isChecked}
                      onChange={handleChange}
                    />
                    {label}
                  </label>

                  {isChecked && (
                    <div className={styles.optionBody}>
                      {value === 'branch' && (
                        <Dropdown
                          fullWidth
                          name="branch"
                          placeholder="Select branch"
                          options={[]}
                          value={values.branch}
                          error={errors.branch}
                          onChange={(val: string) =>
                            handleChange({
                              target: { name: 'branch', value: val },
                            } as unknown as React.ChangeEvent<HTMLInputElement>)
                          }
                        />
                      )}

                      {value === 'postomat' && (
                        <Dropdown
                          fullWidth
                          name="postomat"
                          placeholder="Select postomat"
                          options={[]}
                          value={values.postomat}
                          error={errors.postomat}
                          onChange={(val: string) =>
                            handleChange({
                              target: { name: 'postomat', value: val },
                            } as unknown as React.ChangeEvent<HTMLInputElement>)
                          }
                        />
                      )}

                      {value === 'courier' && (
                        <FormField
                          name="address"
                          label="Delivery address"
                          type="text"
                          autoComplete="street-address"
                          value={values.address}
                          error={errors.address}
                          onChange={handleChange}
                        />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
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
