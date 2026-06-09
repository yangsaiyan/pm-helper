import { createLabelGetter } from "../shared";

export const CURRENCY_CODE = {
  MYR: 0,
  CNY: 1,
  VND: 2,
  USD: 3,
} as const;

export type CurrencyCode = (typeof CURRENCY_CODE)[keyof typeof CURRENCY_CODE];

export const CURRENCY_CODE_LABEL: Record<CurrencyCode, string> = {
  [CURRENCY_CODE.MYR]: "MYR",
  [CURRENCY_CODE.CNY]: "CNY",
  [CURRENCY_CODE.VND]: "VND",
  [CURRENCY_CODE.USD]: "USD",
};

export const getCurrencyCodeLabel =
  createLabelGetter<CurrencyCode>(CURRENCY_CODE_LABEL);
