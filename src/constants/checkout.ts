import type { CheckoutFormValues, DeliveryMethod } from '@/types';

export const CHECKOUT_INITIAL_VALUES: CheckoutFormValues = {
  name: '',
  phone: '',
  email: '',
  city: '',
  address: '',
  branch: '',
  postomat: '',
  delivery: 'branch',
};

export const CHECKOUT_FIELDS = [
  { name: 'name', label: 'Full name', type: 'text', autoComplete: 'name' },
  { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  {
    name: 'city',
    label: 'City',
    type: 'text',
    autoComplete: 'address-level2',
  },
] as const;

export const DELIVERY_OPTIONS: { value: DeliveryMethod; label: string }[] = [
  { value: 'branch', label: 'Nova Poshta branch' },
  { value: 'postomat', label: 'Nova Poshta postomat' },
  { value: 'courier', label: 'Nova Poshta courier' },
];

export const CHECKOUT_RULES = {
  nameMinLength: 2,
  phonePattern: /^\+?\d{10,12}$/,
  emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

export const CHECKOUT_MESSAGES = {
  required: 'This field is required',
  name: 'Name is too short',
  phone: 'Enter a valid phone number',
  email: 'Enter a valid email address',
  delivery: 'Please select a delivery point',
};
