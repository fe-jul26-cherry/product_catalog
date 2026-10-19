import { CHECKOUT_MESSAGES, CHECKOUT_RULES } from '@/constants';

import type { CheckoutErrors, CheckoutFormValues } from '@/types';

const normalizePhone = (phone: string) => phone.replace(/[\s()-]/g, '');

export const validateCheckout = (
  values: CheckoutFormValues,
): CheckoutErrors => {
  const errors: CheckoutErrors = {};

  const name = values.name.trim();
  const phone = normalizePhone(values.phone);
  const email = values.email.trim();

  if (!name) {
    errors.name = CHECKOUT_MESSAGES.required;
  } else if (name.length < CHECKOUT_RULES.nameMinLength) {
    errors.name = CHECKOUT_MESSAGES.name;
  }

  if (!phone) {
    errors.phone = CHECKOUT_MESSAGES.required;
  } else if (!CHECKOUT_RULES.phonePattern.test(phone)) {
    errors.phone = CHECKOUT_MESSAGES.phone;
  }

  if (!email) {
    errors.email = CHECKOUT_MESSAGES.required;
  } else if (!CHECKOUT_RULES.emailPattern.test(email)) {
    errors.email = CHECKOUT_MESSAGES.email;
  }

  if (!values.city.trim()) {
    errors.city = CHECKOUT_MESSAGES.required;
  } else if (!values.cityRef) {
    errors.city = CHECKOUT_MESSAGES.city;
  }

  if (values.delivery === 'branch' && !values.branch.trim()) {
    errors.branch = CHECKOUT_MESSAGES.delivery;
  }

  if (values.delivery === 'postomat' && !values.postomat.trim()) {
    errors.postomat = CHECKOUT_MESSAGES.delivery;
  }

  if (values.delivery === 'courier' && !values.address.trim()) {
    errors.address = CHECKOUT_MESSAGES.required;
  }

  return errors;
};
