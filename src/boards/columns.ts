import { createLabelGetter } from "../shared";

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
  PENDING_REVIEW: 1,
  REVIEWED: 2,
  APPROVED: 3,
  COMPLETED: 4,
  REJECTED: 5,
  CATEGORY_VERIFIED: 6,
  RECEIVED: 7,
  SETTLED: 8,
} as const;

export const VENUE_BOOKING_COLUMN_CATEGORY = {
  PENDING: 1,
  APPROVED: 2,
  REJECTED: 3,
  REOPENED: 4,
} as const;

export type ColumnCategory =
  (typeof COLUMN_CATEGORY)[keyof typeof COLUMN_CATEGORY];

export type ExpensesClaimColumnCategory =
  (typeof EXPENSES_CLAIM_COLUMN_CATEGORY)[keyof typeof EXPENSES_CLAIM_COLUMN_CATEGORY];

export type VenueBookingColumnCategory =
  (typeof VENUE_BOOKING_COLUMN_CATEGORY)[keyof typeof VENUE_BOOKING_COLUMN_CATEGORY];

export const EXPENSES_CLAIM_COLUMN_CATEGORY_LABEL: Record<
  ExpensesClaimColumnCategory,
  string
> = {
  [EXPENSES_CLAIM_COLUMN_CATEGORY.DRAFT]: "Draft",
  [EXPENSES_CLAIM_COLUMN_CATEGORY.PENDING_REVIEW]: "Pending Review",
  [EXPENSES_CLAIM_COLUMN_CATEGORY.REVIEWED]: "Reviewed",
  [EXPENSES_CLAIM_COLUMN_CATEGORY.APPROVED]: "Approved",
  [EXPENSES_CLAIM_COLUMN_CATEGORY.COMPLETED]: "Completed",
  [EXPENSES_CLAIM_COLUMN_CATEGORY.REJECTED]: "Rejected",
  [EXPENSES_CLAIM_COLUMN_CATEGORY.CATEGORY_VERIFIED]: "Verified",
  [EXPENSES_CLAIM_COLUMN_CATEGORY.RECEIVED]: "Received",
  [EXPENSES_CLAIM_COLUMN_CATEGORY.SETTLED]: "Settled",
};

export const EXPENSES_CLAIM_COLUMN_CATEGORY_LABEL_ZH: Record<
  ExpensesClaimColumnCategory,
  string
> = {
  [EXPENSES_CLAIM_COLUMN_CATEGORY.DRAFT]: "草稿",
  [EXPENSES_CLAIM_COLUMN_CATEGORY.PENDING_REVIEW]: "待审批",
  [EXPENSES_CLAIM_COLUMN_CATEGORY.REVIEWED]: "已审批",
  [EXPENSES_CLAIM_COLUMN_CATEGORY.APPROVED]: "已批准",
  [EXPENSES_CLAIM_COLUMN_CATEGORY.COMPLETED]: "已出款",
  [EXPENSES_CLAIM_COLUMN_CATEGORY.REJECTED]: "已拒绝",
  [EXPENSES_CLAIM_COLUMN_CATEGORY.CATEGORY_VERIFIED]: "已核对",
  [EXPENSES_CLAIM_COLUMN_CATEGORY.RECEIVED]: "已收款",
  [EXPENSES_CLAIM_COLUMN_CATEGORY.SETTLED]: "已结算",
};

export const getExpensesClaimColumnCategoryLabel =
  createLabelGetter<ExpensesClaimColumnCategory>(
    EXPENSES_CLAIM_COLUMN_CATEGORY_LABEL,
  );

export const getExpensesClaimColumnCategoryLabelZh =
  createLabelGetter<ExpensesClaimColumnCategory>(
    EXPENSES_CLAIM_COLUMN_CATEGORY_LABEL_ZH,
  );

/**
 * Board position is workflow order and no longer equals the category value.
 *
 * Verified sits AHEAD of Approved: the category is checked before the accrual
 * picks an expense account from it. Settled follows Received and closes out an
 * advance; Rejected stays last as the terminal failure state.
 */
export const EXPENSES_CLAIM_COLUMN_POSITION: Record<
  ExpensesClaimColumnCategory,
  number
> = {
  [EXPENSES_CLAIM_COLUMN_CATEGORY.DRAFT]: 0,
  [EXPENSES_CLAIM_COLUMN_CATEGORY.PENDING_REVIEW]: 1,
  [EXPENSES_CLAIM_COLUMN_CATEGORY.REVIEWED]: 2,
  [EXPENSES_CLAIM_COLUMN_CATEGORY.CATEGORY_VERIFIED]: 3,
  [EXPENSES_CLAIM_COLUMN_CATEGORY.APPROVED]: 4,
  [EXPENSES_CLAIM_COLUMN_CATEGORY.COMPLETED]: 5,
  [EXPENSES_CLAIM_COLUMN_CATEGORY.RECEIVED]: 6,
  [EXPENSES_CLAIM_COLUMN_CATEGORY.SETTLED]: 7,
  [EXPENSES_CLAIM_COLUMN_CATEGORY.REJECTED]: 8,
};

/** Matches `VARCHAR(1000)` on `expenses_claim_events.reason`. */
export const CLAIM_REJECTION_REASON_MAX = 1000;

/**
 * A reason is required on any move to `REJECTED` and on the non-receipt move
 * `COMPLETED -> APPROVED`. It must be refused on every other move.
 */
export const isClaimReasonRequired = (
  from: ExpensesClaimColumnCategory,
  to: ExpensesClaimColumnCategory,
): boolean =>
  to === EXPENSES_CLAIM_COLUMN_CATEGORY.REJECTED ||
  (from === EXPENSES_CLAIM_COLUMN_CATEGORY.COMPLETED &&
    to === EXPENSES_CLAIM_COLUMN_CATEGORY.APPROVED);
