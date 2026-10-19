import { Button } from '@/components/atoms/Button';
import { CityAutocomplete } from '@/components/molecules/CityAutocomplete';
import { Dropdown } from '@/components/molecules/Dropdown';
import { FormField } from '@/components/molecules/FormField';
import { Modal } from '@/components/molecules/Modal';
import {
  CHECKOUT_FIELDS,
  DELIVERY_OPTIONS,
  NOVA_POSHTA_MESSAGES,
} from '@/constants';
import {
  useCheckoutForm,
  useNovaPoshtaCities,
  useNovaPoshtaWarehouses,
} from '@/hooks';

import styles from './CheckoutModal.module.scss';

import type { CheckoutFormValues, NovaPoshtaPointKind } from '@/types';

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
  const {
    values,
    errors,
    isSubmitted,
    handleChange,
    handleCityChange,
    handleSelect,
    handleSubmit,
  } = useCheckoutForm(onSubmit);

  const pointKind: NovaPoshtaPointKind | null =
    values.delivery === 'courier' ? null : values.delivery;

  const cities = useNovaPoshtaCities(values.cityRef ? '' : values.city);
  const warehouses = useNovaPoshtaWarehouses(values.cityRef, pointKind);

  const cityOptions = cities.cities.map((city) => ({
    value: city.Ref,
    label:
      city.AreaDescription ?
        `${city.Description}, ${city.AreaDescription}`
      : city.Description,
  }));

  const pointOptions = warehouses.points.map((point) => ({
    value: point.Ref,
    label: point.Description,
  }));

  const cityMessage =
    cities.isLoading ? NOVA_POSHTA_MESSAGES.searching
    : cities.error ? cities.error
    : cities.isSearchable ? NOVA_POSHTA_MESSAGES.noCities
    : undefined;

  const getPointPlaceholder = (idle: string) =>
    !values.cityRef ? NOVA_POSHTA_MESSAGES.selectCity
    : warehouses.isLoading ? NOVA_POSHTA_MESSAGES.loading
    : warehouses.error ? warehouses.error
    : pointOptions.length === 0 ? NOVA_POSHTA_MESSAGES.noPoints
    : idle;

  const handleCitySelect = (ref: string) => {
    const city = cities.cities.find((item) => item.Ref === ref);

    if (city) {
      handleCityChange(city.Description, city.Ref);
    }
  };

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
        {CHECKOUT_FIELDS.map((field) =>
          field.name === 'city' ?
            <CityAutocomplete
              key={field.name}
              name={field.name}
              label={field.label}
              autoComplete="off"
              value={values.city}
              options={cityOptions}
              message={cityMessage}
              error={errors.city}
              onInputChange={(city) => handleCityChange(city)}
              onSelect={({ value }) => handleCitySelect(value)}
            />
          : <FormField
              key={field.name}
              {...field}
              value={values[field.name as keyof CheckoutFormValues]}
              error={errors[field.name as keyof CheckoutFormValues]}
              onChange={handleChange}
            />,
        )}

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
                          disabled={!values.cityRef || warehouses.isLoading}
                          placeholder={getPointPlaceholder(
                            NOVA_POSHTA_MESSAGES.selectBranch,
                          )}
                          options={pointOptions}
                          value={values.branch}
                          error={errors.branch}
                          onChange={(val: string) =>
                            handleSelect('branch', val)
                          }
                        />
                      )}

                      {value === 'postomat' && (
                        <Dropdown
                          fullWidth
                          name="postomat"
                          disabled={!values.cityRef || warehouses.isLoading}
                          placeholder={getPointPlaceholder(
                            NOVA_POSHTA_MESSAGES.selectPostomat,
                          )}
                          options={pointOptions}
                          value={values.postomat}
                          error={errors.postomat}
                          onChange={(val: string) =>
                            handleSelect('postomat', val)
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
