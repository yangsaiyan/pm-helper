import { describe, expect, it } from "vitest";
import {
  ASSET_TYPE,
  COLUMN_CATEGORY,
  ISSUE_PRIORITY,
  ISSUE_PRIORITY_LABEL,
  ISSUE_TYPE,
  ORGANIZATION_ROLE,
  PERMISSION,
  PERMISSION_LABEL,
  REQUEST_LOG_METHOD,
  getAssetTypeLabel,
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

  it("keeps asset type mapping stable", () => {
    expect(ASSET_TYPE).toEqual({
      VEHICLE: 0,
      LAPTOP: 1,
      PROJECTOR: 2,
      EQUIPMENT: 3,
      FURNITURE: 4,
      MONITOR: 5,
      PRINTER: 6,
      CAMERA: 7,
      TABLET: 8,
      MOBILE_DEVICE: 9,
      OTHER: 10,
    });
    expect(getAssetTypeLabel(ASSET_TYPE.EQUIPMENT)).toBe("Equipment");
    expect(getAssetTypeLabel(ASSET_TYPE.OTHER)).toBe("Other");
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
      ANNOUNCEMENT_MANAGE: "announcement.manage",
      PROJECT_CREATE: "project.create",
      PROJECT_UPDATE: "project.update",
      PROJECT_DELETE: "project.delete",
      ISSUE_KANBAN_CREATE: "issue.kanban.create",
      ISSUE_KANBAN_UPDATE: "issue.kanban.update",
      ISSUE_KANBAN_DELETE: "issue.kanban.delete",
      ISSUE_EXPENSES_CLAIM_CREATE: "issue.expenses_claim.create",
      ISSUE_EXPENSES_CLAIM_EDIT: "issue.expenses_claim.edit",
      ISSUE_EXPENSES_CLAIM_UPDATE: "issue.expenses_claim.update",
      ISSUE_EXPENSES_CLAIM_DELETE: "issue.expenses_claim.delete",
      ISSUE_VENUE_BOOKING_CREATE: "issue.venue_booking.create",
      ISSUE_VENUE_BOOKING_EDIT: "issue.venue_booking.edit",
      ISSUE_VENUE_BOOKING_UPDATE: "issue.venue_booking.update",
      ISSUE_VENUE_BOOKING_DELETE: "issue.venue_booking.delete",
      ISSUE_ASSET_BOOKING_CREATE: "issue.asset_booking.create",
      ISSUE_ASSET_BOOKING_EDIT: "issue.asset_booking.edit",
      ISSUE_ASSET_BOOKING_UPDATE: "issue.asset_booking.update",
      ISSUE_ASSET_BOOKING_DELETE: "issue.asset_booking.delete",
    });
  });

  it("keeps permission label map stable", () => {
    expect(PERMISSION_LABEL).toEqual({
      [PERMISSION.ORG_MANAGE]: "Manage Organization",
      [PERMISSION.MEMBER_INVITE]: "Invite Members",
      [PERMISSION.ANNOUNCEMENT_MANAGE]: "Manage Announcements",
      [PERMISSION.PROJECT_CREATE]: "Create Projects",
      [PERMISSION.PROJECT_UPDATE]: "Update Projects",
      [PERMISSION.PROJECT_DELETE]: "Delete Projects",
      [PERMISSION.ISSUE_KANBAN_CREATE]: "Create Kanban Issues",
      [PERMISSION.ISSUE_KANBAN_UPDATE]: "Update Kanban Issues",
      [PERMISSION.ISSUE_KANBAN_DELETE]: "Delete Kanban Issues",
      [PERMISSION.ISSUE_EXPENSES_CLAIM_CREATE]: "Create Expense Claims",
      [PERMISSION.ISSUE_EXPENSES_CLAIM_EDIT]: "Edit Expense Claims",
      [PERMISSION.ISSUE_EXPENSES_CLAIM_UPDATE]: "Update Expense Claims",
      [PERMISSION.ISSUE_EXPENSES_CLAIM_DELETE]: "Delete Expense Claims",
      [PERMISSION.ISSUE_VENUE_BOOKING_CREATE]: "Create Venue Bookings",
      [PERMISSION.ISSUE_VENUE_BOOKING_EDIT]: "Edit Venue Bookings",
      [PERMISSION.ISSUE_VENUE_BOOKING_UPDATE]: "Update Venue Bookings",
      [PERMISSION.ISSUE_VENUE_BOOKING_DELETE]: "Delete Venue Bookings",
      [PERMISSION.ISSUE_ASSET_BOOKING_CREATE]: "Create Asset Bookings",
      [PERMISSION.ISSUE_ASSET_BOOKING_EDIT]: "Edit Asset Bookings",
      [PERMISSION.ISSUE_ASSET_BOOKING_UPDATE]: "Update Asset Bookings",
      [PERMISSION.ISSUE_ASSET_BOOKING_DELETE]: "Delete Asset Bookings",
    });
  });

  it("returns permission labels from string mapping values", () => {
    expect(getPermissionLabel(PERMISSION.ORG_MANAGE)).toBe("Manage Organization");
    expect(getPermissionLabel(PERMISSION.MEMBER_INVITE)).toBe("Invite Members");
    expect(getPermissionLabel(PERMISSION.ANNOUNCEMENT_MANAGE)).toBe(
      "Manage Announcements",
    );
  });
});
