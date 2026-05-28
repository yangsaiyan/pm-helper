import { createLabelGetter } from "../shared";

export const ISSUE_PRIORITY = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
  URGENT: 3,
} as const;

export type IssuePriority =
  (typeof ISSUE_PRIORITY)[keyof typeof ISSUE_PRIORITY];

export const ISSUE_PRIORITY_LABEL: Record<IssuePriority, string> = {
  [ISSUE_PRIORITY.LOW]: "Low",
  [ISSUE_PRIORITY.MEDIUM]: "Medium",
  [ISSUE_PRIORITY.HIGH]: "High",
  [ISSUE_PRIORITY.URGENT]: "Urgent",
};

export const getIssuePriorityLabel =
  createLabelGetter<IssuePriority>(ISSUE_PRIORITY_LABEL);
