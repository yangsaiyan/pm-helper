import { createLabelGetter } from "../shared";

export const EXPENSES_CLAIM_CATEGORY = {
  TRAVEL: 0,
  MEALS: 1,
  ACCOMMODATION: 2,
  TRANSPORT: 3,
  OFFICE_SUPPLIES: 4,
  COMMUNICATION: 5,
  ENTERTAINMENT: 6,
  TRAINING: 7,
  MEDICAL: 8,
  MISCELLANEOUS: 9,
} as const;

export type ExpensesClaimCategory =
  (typeof EXPENSES_CLAIM_CATEGORY)[keyof typeof EXPENSES_CLAIM_CATEGORY];

export const EXPENSES_CLAIM_CATEGORY_LABEL: Record<
  ExpensesClaimCategory,
  string
> = {
  [EXPENSES_CLAIM_CATEGORY.TRAVEL]: "Travel",
  [EXPENSES_CLAIM_CATEGORY.MEALS]: "Meals",
  [EXPENSES_CLAIM_CATEGORY.ACCOMMODATION]: "Accommodation",
  [EXPENSES_CLAIM_CATEGORY.TRANSPORT]: "Transport",
  [EXPENSES_CLAIM_CATEGORY.OFFICE_SUPPLIES]: "Office Supplies",
  [EXPENSES_CLAIM_CATEGORY.COMMUNICATION]: "Communication",
  [EXPENSES_CLAIM_CATEGORY.ENTERTAINMENT]: "Entertainment",
  [EXPENSES_CLAIM_CATEGORY.TRAINING]: "Training",
  [EXPENSES_CLAIM_CATEGORY.MEDICAL]: "Medical",
  [EXPENSES_CLAIM_CATEGORY.MISCELLANEOUS]: "Miscellaneous",
};

export const getExpensesClaimCategoryLabel =
  createLabelGetter<ExpensesClaimCategory>(EXPENSES_CLAIM_CATEGORY_LABEL);
