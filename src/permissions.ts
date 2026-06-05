import { ROLE, type Role } from "./organization/roles";
import { createLabelGetter } from "./shared";

export const PERMISSION = {
  WATCH: 0,
  EDIT: 1,
  MANAGE_ROLES: 2,
  DELETE: 3,
} as const;

export type Permission = (typeof PERMISSION)[keyof typeof PERMISSION];

export const PERMISSION_LABEL: Record<Permission, string> = {
  [PERMISSION.WATCH]: "Watch",
  [PERMISSION.EDIT]: "Edit",
  [PERMISSION.MANAGE_ROLES]: "Manage Roles",
  [PERMISSION.DELETE]: "Delete",
};

export const getPermissionLabel =
  createLabelGetter<Permission>(PERMISSION_LABEL);

export const ORG_PERMISSIONS: Record<
  Role,
  readonly Permission[]
> = {
  [ROLE.OWNER]: [
    PERMISSION.WATCH,
    PERMISSION.EDIT,
    PERMISSION.MANAGE_ROLES,
  ],
  [ROLE.ADMIN]: [
    PERMISSION.WATCH,
    PERMISSION.EDIT,
    PERMISSION.MANAGE_ROLES,
  ],
  [ROLE.MEMBER]: [PERMISSION.WATCH, PERMISSION.EDIT],
  [ROLE.GUEST]: [PERMISSION.WATCH],
};

export const PROJECT_PERMISSIONS: Record<
  Role,
  readonly Permission[]
> = {
  [ROLE.OWNER]: [
    PERMISSION.WATCH,
    PERMISSION.EDIT,
    PERMISSION.MANAGE_ROLES,
  ],
  [ROLE.ADMIN]: [
    PERMISSION.WATCH,
    PERMISSION.EDIT,
    PERMISSION.MANAGE_ROLES,
  ],
  [ROLE.MEMBER]: [PERMISSION.WATCH, PERMISSION.EDIT],
  [ROLE.GUEST]: [PERMISSION.WATCH],
};

export const hasPermission = (
  role: Role,
  permission: Permission,
  scope: "organization" | "project" = "organization",
): boolean => {
  const matrix = scope === "organization" ? ORG_PERMISSIONS : PROJECT_PERMISSIONS;
  return matrix[role].includes(permission);
};

export const canDelete = (
  role: Role,
  resourceType: "organization" | "project" | "issue",
  isCreator: boolean = false,
): boolean => {
  if (resourceType === "issue") {
    return hasPermission(role, PERMISSION.EDIT, "project");
  }
  return hasPermission(role, PERMISSION.EDIT, resourceType) && isCreator;
};
