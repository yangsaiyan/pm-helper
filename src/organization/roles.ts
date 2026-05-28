export const ORGANIZATION_ROLE = {
  OWNER: 0,
  ADMIN: 1,
  MEMBER: 2,
  GUEST: 3,
} as const;

export type OrganizationRole =
  (typeof ORGANIZATION_ROLE)[keyof typeof ORGANIZATION_ROLE];
