import { createLabelGetter } from "../shared";

export const ISSUE_TYPE = {
  EPIC: 0,
  TASK: 1,
  BUG: 2,
  FEATURE: 3,
  SUBTASK: 4,
} as const;

export type IssueType = (typeof ISSUE_TYPE)[keyof typeof ISSUE_TYPE];

export const ISSUE_TYPE_LABEL: Record<IssueType, string> = {
  [ISSUE_TYPE.EPIC]: "Epic",
  [ISSUE_TYPE.TASK]: "Task",
  [ISSUE_TYPE.BUG]: "Bug",
  [ISSUE_TYPE.FEATURE]: "Feature",
  [ISSUE_TYPE.SUBTASK]: "Subtask",
};

export const getIssueTypeLabel = createLabelGetter<IssueType>(ISSUE_TYPE_LABEL);
