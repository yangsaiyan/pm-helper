export const PROJECT_STATUS = {
  ACTIVE: 0,
  ARCHIVED: 1,
} as const;

export type ProjectStatus =
  (typeof PROJECT_STATUS)[keyof typeof PROJECT_STATUS];
