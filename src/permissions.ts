import { createLabelGetter } from "./shared";

export const PERMISSION = {
  WATCH: 0,
  EDIT: 1,
  MANAGE_ROLES: 2,
} as const;

export type Permission = (typeof PERMISSION)[keyof typeof PERMISSION];

export const PERMISSION_LABEL: Record<Permission, string> = {
  [PERMISSION.WATCH]: "Watch",
  [PERMISSION.EDIT]: "Edit",
  [PERMISSION.MANAGE_ROLES]: "Manage Roles",
};

export const getPermissionLabel =
  createLabelGetter<Permission>(PERMISSION_LABEL);
