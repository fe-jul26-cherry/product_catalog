import { useState } from 'react';

import { CHECKOUT_FIELDS, CHECKOUT_INITIAL_VALUES } from '@/constants';
import { validateCheckout } from '@/utils';

import type { CheckoutErrors, CheckoutFormValues } from '@/types';
import type { ChangeEvent, FormEvent } from 'react';

export const useCheckoutForm = (
  onValid: (values: CheckoutFormValues) => void,
) => {
  const [values, setValues] = useState<CheckoutFormValues>(
    CHECKOUT_INITIAL_VALUES,
  );
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleCityChange = (city: string, cityRef = '') => {
    setValues((prev) => ({ ...prev, city, cityRef, branch: '', postomat: '' }));
    setErrors((prev) => ({
      ...prev,
      city: undefined,
      branch: undefined,
      postomat: undefined,
    }));
  };

  const handleSelect = (name: 'branch' | 'postomat', value: string) => {
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

    onValid(values);
    setIsSubmitted(true);
  };

  return {
    values,
    errors,
    isSubmitted,
    handleChange,
    handleCityChange,
    handleSelect,
    handleSubmit,
  };
};
