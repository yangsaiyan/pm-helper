export const ROLE = {
  OWNER: 0,
  ADMIN: 1,
  MEMBER: 2,
  GUEST: 3,
} as const;

export const ORGANIZATION_ROLE = ROLE;

export type Role =
  (typeof ROLE)[keyof typeof ROLE];

export type OrganizationRole = Role;
