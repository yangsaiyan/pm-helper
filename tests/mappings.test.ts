import { describe, expect, it } from "vitest";
import {
  COLUMN_CATEGORY,
  ISSUE_PRIORITY,
  ISSUE_PRIORITY_LABEL,
  ISSUE_TYPE,
  ORGANIZATION_ROLE,
  ORG_PERMISSIONS,
  PERMISSION,
  PERMISSION_LABEL,
  PROJECT_PERMISSIONS,
  REQUEST_LOG_METHOD,
  canDelete,
  getIssuePriorityLabel,
  getIssueTypeLabel,
  getPermissionLabel,
  getRequestLogMethodLabel,
  hasPermission,
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
    expect(PERMISSION).toEqual({ WATCH: 0, EDIT: 1, MANAGE_ROLES: 2, DELETE: 3 });
  });

  it("keeps permission label map stable", () => {
    expect(PERMISSION_LABEL).toEqual({
      [PERMISSION.WATCH]: "Watch",
      [PERMISSION.EDIT]: "Edit",
      [PERMISSION.MANAGE_ROLES]: "Manage Roles",
      [PERMISSION.DELETE]: "Delete",
    });
  });

  it("returns permission labels from numeric mapping values", () => {
    expect(getPermissionLabel(PERMISSION.WATCH)).toBe("Watch");
    expect(getPermissionLabel(PERMISSION.MANAGE_ROLES)).toBe("Manage Roles");
  });

  it("grants owner all organization permissions", () => {
    expect(ORG_PERMISSIONS[ORGANIZATION_ROLE.OWNER]).toEqual([
      PERMISSION.WATCH,
      PERMISSION.EDIT,
      PERMISSION.MANAGE_ROLES,
    ]);
  });

  it("restricts guest to watch only", () => {
    expect(ORG_PERMISSIONS[ORGANIZATION_ROLE.GUEST]).toEqual([PERMISSION.WATCH]);
    expect(PROJECT_PERMISSIONS[ORGANIZATION_ROLE.GUEST]).toEqual([PERMISSION.WATCH]);
  });

  it("grants member watch and edit", () => {
    expect(ORG_PERMISSIONS[ORGANIZATION_ROLE.MEMBER]).toEqual([
      PERMISSION.WATCH,
      PERMISSION.EDIT,
    ]);
  });

  it("checks permissions correctly", () => {
    expect(hasPermission(ORGANIZATION_ROLE.OWNER, PERMISSION.WATCH)).toBe(true);
    expect(hasPermission(ORGANIZATION_ROLE.OWNER, PERMISSION.MANAGE_ROLES)).toBe(true);
    expect(hasPermission(ORGANIZATION_ROLE.GUEST, PERMISSION.EDIT)).toBe(false);
    expect(hasPermission(ORGANIZATION_ROLE.GUEST, PERMISSION.MANAGE_ROLES)).toBe(false);
  });

  it("checks project scope permissions", () => {
    expect(hasPermission(ORGANIZATION_ROLE.MEMBER, PERMISSION.EDIT, "project")).toBe(true);
    expect(hasPermission(ORGANIZATION_ROLE.GUEST, PERMISSION.EDIT, "project")).toBe(false);
  });

  it("defaults to organization scope", () => {
    expect(hasPermission(ORGANIZATION_ROLE.ADMIN, PERMISSION.MANAGE_ROLES)).toBe(true);
  });

  it("allows issue deletion with EDIT permission", () => {
    expect(canDelete(ORGANIZATION_ROLE.MEMBER, "issue")).toBe(true);
    expect(canDelete(ORGANIZATION_ROLE.GUEST, "issue")).toBe(false);
  });

  it("restricts project/org deletion to creator", () => {
    expect(canDelete(ORGANIZATION_ROLE.ADMIN, "project", true)).toBe(true);
    expect(canDelete(ORGANIZATION_ROLE.ADMIN, "project", false)).toBe(false);
    expect(canDelete(ORGANIZATION_ROLE.OWNER, "organization", true)).toBe(true);
    expect(canDelete(ORGANIZATION_ROLE.MEMBER, "organization", false)).toBe(false);
  });
});
