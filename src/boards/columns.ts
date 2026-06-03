export const COLUMN_CATEGORY = {
  BACKLOG: 0,
  TODO: 1,
  IN_PROGRESS: 2,
  REVIEW: 3,
  BLOCKED: 4,
  DONE: 5,
  CANCELLED: 6,
} as const;

export type ColumnCategory =
  (typeof COLUMN_CATEGORY)[keyof typeof COLUMN_CATEGORY];
