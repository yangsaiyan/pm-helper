export const COLUMN_CATEGORY = {
  TODO: 0,
  IN_PROGRESS: 1,
  DONE: 2,
} as const;

export type ColumnCategory =
  (typeof COLUMN_CATEGORY)[keyof typeof COLUMN_CATEGORY];
