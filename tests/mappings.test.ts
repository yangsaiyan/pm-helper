import { describe, expect, it } from "vitest";
import {
  COLUMN_CATEGORY,
  ISSUE_PRIORITY,
  ISSUE_PRIORITY_LABEL,
  ISSUE_TYPE,
  ORGANIZATION_ROLE,
  PERMISSION,
  PERMISSION_LABEL,
  REQUEST_LOG_METHOD,
  getIssuePriorityLabel,
  getIssueTypeLabel,
  getPermissionLabel,
  getRequestLogMethodLabel,
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

  it("keeps request log method mapping stable", () => {
    expect(REQUEST_LOG_METHOD).toEqual({
      GET: 0,
      POST: 1,
      PUT: 2,
      PATCH: 3,
      DELETE: 4,
    });
    expect(getRequestLogMethodLabel(0)).toBe("GET");
    expect(getRequestLogMethodLabel(4)).toBe("DELETE");
  });

  it("keeps permission constants stable", () => {
    expect(PERMISSION).toEqual({
      ORG_MANAGE: "org.manage",
      MEMBER_INVITE: "member.invite",
      PROJECT_CREATE: "project.create",
      PROJECT_UPDATE: "project.update",
      PROJECT_DELETE: "project.delete",
      ISSUE_CREATE: "issue.create",
      ISSUE_UPDATE: "issue.update",
      ISSUE_DELETE: "issue.delete",
    });
  });

  it("keeps permission label map stable", () => {
    expect(PERMISSION_LABEL).toEqual({
      [PERMISSION.ORG_MANAGE]: "Manage Organization",
      [PERMISSION.MEMBER_INVITE]: "Invite Members",
      [PERMISSION.PROJECT_CREATE]: "Create Projects",
      [PERMISSION.PROJECT_UPDATE]: "Update Projects",
      [PERMISSION.PROJECT_DELETE]: "Delete Projects",
      [PERMISSION.ISSUE_CREATE]: "Create Issues",
      [PERMISSION.ISSUE_UPDATE]: "Update Issues",
      [PERMISSION.ISSUE_DELETE]: "Delete Issues",
    });
  });

  it("returns permission labels from string mapping values", () => {
    expect(getPermissionLabel(PERMISSION.ORG_MANAGE)).toBe("Manage Organization");
    expect(getPermissionLabel(PERMISSION.MEMBER_INVITE)).toBe("Invite Members");
  });
});
