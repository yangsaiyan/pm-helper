export const RECENT_VIEW_ENTITY = {
  ISSUE: "issue",
  PROJECT: "project",
  FILE: "file",
} as const;

export type RecentViewEntity =
  (typeof RECENT_VIEW_ENTITY)[keyof typeof RECENT_VIEW_ENTITY];