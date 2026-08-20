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
 * Approved sits AHEAD of Verified. This reverses the original order, and the
 * invariant that order protected — never accrue to an account no human has
 * verified — was preserved by moving the accrual rather than the steps: it is
 * now raised on entry to CATEGORY_VERIFIED, not APPROVED. So the category is
 * still checked at the moment it picks an expense account; only the approval
 * signature now precedes it.
 *
 * Rejected stays last as the terminal failure state.
 *
 * ⚠️ Rejected is 7 here because SETTLED was removed from this package, but the
 * seeded boards place Settled at 7 and Rejected at 8. This map therefore does
 * NOT describe an existing board. It has shipped a wrong order in both
 * directions before now, which is why neither the API nor the web client reads
 * it to decide anything — treat it as display order only, and keep it in step
 * with `CLAIM_COLUMNS` in the API's board-provisioning service.
 */
export const EXPENSES_CLAIM_COLUMN_POSITION: Record<
  ExpensesClaimColumnCategory,
  number
> = {
  [EXPENSES_CLAIM_COLUMN_CATEGORY.DRAFT]: 0,
  [EXPENSES_CLAIM_COLUMN_CATEGORY.PENDING_REVIEW]: 1,
  [EXPENSES_CLAIM_COLUMN_CATEGORY.REVIEWED]: 2,
  [EXPENSES_CLAIM_COLUMN_CATEGORY.APPROVED]: 3,
  [EXPENSES_CLAIM_COLUMN_CATEGORY.CATEGORY_VERIFIED]: 4,
  [EXPENSES_CLAIM_COLUMN_CATEGORY.COMPLETED]: 5,
  [EXPENSES_CLAIM_COLUMN_CATEGORY.RECEIVED]: 6,
  [EXPENSES_CLAIM_COLUMN_CATEGORY.REJECTED]: 7,
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
