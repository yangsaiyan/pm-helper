# Permission System Design

## Overview

Add a role-based permission system to `@korre/mappings` that maps organization roles to allowed actions at both organization and project levels.

## Requirements

- 4 roles: Owner (0), Admin (1), Member (2), Guest (3)
- 4 permissions: Watch, Edit, Manage Roles, Delete
- Two scopes: organization, project
- Permission matrix approach for explicit, testable mappings
- Delete permissions depend on resource type and ownership:
  - Issue: anyone with EDIT permission can delete
  - Project/Organization: only creator with EDIT permission can delete

## Permission Matrix

| Role   | Watch | Edit | Manage Roles |
|--------|-------|------|--------------|
| Owner  | ✓     | ✓    | ✓            |
| Admin  | ✓     | ✓    | ✓            |
| Member | ✓     | ✓    | ✗            |
| Guest  | ✓     | ✗    | ✗            |

Both organization and project scopes use the same permission matrix.

## Delete Permissions

Delete permissions are ownership-dependent:

| Resource Type | Required Permission | Ownership Requirement |
|---------------|--------------------|-----------------------|
| Issue         | EDIT               | None                  |
| Project       | EDIT               | Creator only          |
| Organization  | EDIT               | Creator only          |

## Implementation

### File: `src/permissions.ts`

```typescript
import { ORGANIZATION_ROLE, OrganizationRole } from "./organization";
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

export const ORG_PERMISSIONS: Record<OrganizationRole, readonly Permission[]> = {
  [ORGANIZATION_ROLE.OWNER]: [PERMISSION.WATCH, PERMISSION.EDIT, PERMISSION.MANAGE_ROLES],
  [ORGANIZATION_ROLE.ADMIN]: [PERMISSION.WATCH, PERMISSION.EDIT, PERMISSION.MANAGE_ROLES],
  [ORGANIZATION_ROLE.MEMBER]: [PERMISSION.WATCH, PERMISSION.EDIT],
  [ORGANIZATION_ROLE.GUEST]: [PERMISSION.WATCH],
};

export const PROJECT_PERMISSIONS: Record<OrganizationRole, readonly Permission[]> = {
  [ORGANIZATION_ROLE.OWNER]: [PERMISSION.WATCH, PERMISSION.EDIT, PERMISSION.MANAGE_ROLES],
  [ORGANIZATION_ROLE.ADMIN]: [PERMISSION.WATCH, PERMISSION.EDIT, PERMISSION.MANAGE_ROLES],
  [ORGANIZATION_ROLE.MEMBER]: [PERMISSION.WATCH, PERMISSION.EDIT],
  [ORGANIZATION_ROLE.GUEST]: [PERMISSION.WATCH],
};

export const hasPermission = (
  role: OrganizationRole,
  permission: Permission,
  scope: "organization" | "project" = "organization",
): boolean => {
  const matrix = scope === "organization" ? ORG_PERMISSIONS : PROJECT_PERMISSIONS;
  return matrix[role].includes(permission);
};

export const canDelete = (
  role: OrganizationRole,
  resourceType: "organization" | "project" | "issue",
  isCreator: boolean = false,
): boolean => {
  if (resourceType === "issue") {
    return hasPermission(role, PERMISSION.EDIT, "project");
  }
  return hasPermission(role, PERMISSION.EDIT, resourceType) && isCreator;
};

export const getPermissionLabel = createLabelGetter<Permission>(PERMISSION_LABEL);
```

### File: `src/index.ts` (update)

Add export:
```typescript
export * from "./permissions";
```

### File: `tests/mappings.test.ts` (update)

Add test cases:
```typescript
it("keeps permission constants stable", () => {
  expect(PERMISSION).toEqual({ WATCH: 0, EDIT: 1, MANAGE_ROLES: 2, DELETE: 3 });
});

it("grants owner all permissions", () => {
  expect(hasPermission(ORGANIZATION_ROLE.OWNER, PERMISSION.WATCH)).toBe(true);
  expect(hasPermission(ORGANIZATION_ROLE.OWNER, PERMISSION.EDIT)).toBe(true);
  expect(hasPermission(ORGANIZATION_ROLE.OWNER, PERMISSION.MANAGE_ROLES)).toBe(true);
});

it("restricts guest to watch only", () => {
  expect(hasPermission(ORGANIZATION_ROLE.GUEST, PERMISSION.WATCH)).toBe(true);
  expect(hasPermission(ORGANIZATION_ROLE.GUEST, PERMISSION.EDIT)).toBe(false);
  expect(hasPermission(ORGANIZATION_ROLE.GUEST, PERMISSION.MANAGE_ROLES)).toBe(false);
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

it("returns permission labels", () => {
  expect(getPermissionLabel(PERMISSION.WATCH)).toBe("Watch");
  expect(getPermissionLabel(PERMISSION.MANAGE_ROLES)).toBe("Manage Roles");
  expect(getPermissionLabel(PERMISSION.DELETE)).toBe("Delete");
});
```

## Exports

- `PERMISSION` - Permission constants (WATCH, EDIT, MANAGE_ROLES, DELETE)
- `Permission` - Permission type
- `PERMISSION_LABEL` - Label mapping
- `ORG_PERMISSIONS` - Organization permission matrix
- `PROJECT_PERMISSIONS` - Project permission matrix
- `hasPermission(role, permission, scope)` - Check if role has permission
- `canDelete(role, resourceType, isCreator)` - Check if role can delete resource
- `getPermissionLabel(permission)` - Get human-readable label
