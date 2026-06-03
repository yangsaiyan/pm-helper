import { describe, expect, it } from "vitest";
import {
  COLUMN_CATEGORY,
  ISSUE_PRIORITY,
  ISSUE_PRIORITY_LABEL,
  ISSUE_TYPE,
  ORGANIZATION_ROLE,
  getIssuePriorityLabel,
  getIssueTypeLabel,
  mappingEntries,
} from "../src";

describe("shared mapping constants", () => {
  it("keeps organization roles stable", () => {
    expect(ORGANIZATION_ROLE).toEqual({
      OWNER: 0,
      ADMIN: 1,
      MEMBER: 2,
      GUEST: 3,
    });
  });

  it("keeps issue priority order sortable from lowest to highest", () => {
    expect(ISSUE_PRIORITY).toEqual({
      LOW: 0,
      MEDIUM: 1,
      HIGH: 2,
      URGENT: 3,
    });
  });

  it("keeps column category order sortable from todo to done", () => {
    expect(COLUMN_CATEGORY).toEqual({
      BACKLOG: 0,
      TODO: 1,
      IN_PROGRESS: 2,
      REVIEW: 3,
      BLOCKED: 4,
      DONE: 5,
      CANCELLED: 6,
    });
  });

  it("returns issue labels from numeric mapping values", () => {
    expect(ISSUE_PRIORITY_LABEL[ISSUE_PRIORITY.HIGH]).toBe("High");
    expect(getIssuePriorityLabel(ISSUE_PRIORITY.URGENT)).toBe("Urgent");
    expect(getIssueTypeLabel(ISSUE_TYPE.SUBTASK)).toBe("Subtask");
  });

  it("converts mappings into stable entries for tables and filters", () => {
    expect(mappingEntries(ISSUE_TYPE)).toEqual([
      { key: "EPIC", value: 0 },
      { key: "TASK", value: 1 },
      { key: "BUG", value: 2 },
      { key: "FEATURE", value: 3 },
      { key: "SUBTASK", value: 4 },
    ]);
  });
});
