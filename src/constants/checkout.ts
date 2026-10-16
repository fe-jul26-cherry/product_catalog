import type { CheckoutFormValues, DeliveryMethod } from '@/types';

export const CHECKOUT_INITIAL_VALUES: CheckoutFormValues = {
  name: '',
  phone: '',
  email: '',
  city: '',
  address: '',
  delivery: 'pickup',
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
  {
    name: 'address',
    label: 'Address',
    type: 'text',
    autoComplete: 'street-address',
  },
] as const;

export const DELIVERY_OPTIONS: { value: DeliveryMethod; label: string }[] = [
  { value: 'pickup', label: 'Pickup' },
  { value: 'courier', label: 'Courier' },
];
