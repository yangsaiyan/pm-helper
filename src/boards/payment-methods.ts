import { createLabelGetter } from "../shared";

export const PAYMENT_METHOD = {
  CASH: 0,
  CREDIT_CARD: 1,
  BANK_TRANSFER: 2,
  E_WALLET: 3,
  COMPANY_CARD: 4,
} as const;

export type PaymentMethod =
  (typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD];

export const PAYMENT_METHOD_LABEL: Record<PaymentMethod, string> = {
  [PAYMENT_METHOD.CASH]: "Cash",
  [PAYMENT_METHOD.CREDIT_CARD]: "Credit card",
  [PAYMENT_METHOD.BANK_TRANSFER]: "Bank transfer",
  [PAYMENT_METHOD.E_WALLET]: "E-wallet",
  [PAYMENT_METHOD.COMPANY_CARD]: "Company card",
};

export const getPaymentMethodLabel =
  createLabelGetter<PaymentMethod>(PAYMENT_METHOD_LABEL);
