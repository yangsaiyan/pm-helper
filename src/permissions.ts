import { createLabelGetter } from "./shared";

export const PERMISSION = {
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
} as const;

export type Permission = (typeof PERMISSION)[keyof typeof PERMISSION];

export const PERMISSION_LABEL: Record<Permission, string> = {
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
};

export const getPermissionLabel =
  createLabelGetter<Permission>(PERMISSION_LABEL);
