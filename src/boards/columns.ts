export const COLUMN_CATEGORY = {
  BACKLOG: 0,
  TODO: 1,
  IN_PROGRESS: 2,
  REVIEW: 3,
  BLOCKED: 4,
  DONE: 5,
  CANCELLED: 6,
} as const;

export const EXPENSES_CLAIM_COLUMN_CATEGORY = {
  DRAFT: 0,
  PENDING: 1,
  APPROVED: 2,
  REJECTED: 3,
  REOPENED: 4,
} as const;

export type ColumnCategory =
  (typeof COLUMN_CATEGORY)[keyof typeof COLUMN_CATEGORY];

export type ExpensesClaimColumnCategory =
  (typeof EXPENSES_CLAIM_COLUMN_CATEGORY)[keyof typeof EXPENSES_CLAIM_COLUMN_CATEGORY];
