export type DeliveryMethod = 'pickup' | 'courier';

export interface CheckoutFormValues {
  name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  delivery: DeliveryMethod;
}

export type CheckoutErrors = Partial<Record<keyof CheckoutFormValues, string>>;
