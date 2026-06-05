export const ROLE = {
  OWNER: 0,
  ADMIN: 1,
  MEMBER: 2,
  GUEST: 3,
} as const;

export type Role =
  (typeof ROLE)[keyof typeof ROLE];
