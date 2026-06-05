export const PERMISSION = {
  ORG_MANAGE: "org.manage",
  MEMBER_INVITE: "member.invite",
  PROJECT_CREATE: "project.create",
  PROJECT_UPDATE: "project.update",
  PROJECT_DELETE: "project.delete",
  ISSUE_CREATE: "issue.create",
  ISSUE_UPDATE: "issue.update",
  ISSUE_DELETE: "issue.delete",
} as const;

export type Permission = (typeof PERMISSION)[keyof typeof PERMISSION];