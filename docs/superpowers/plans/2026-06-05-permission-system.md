# Permission System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add role-based permission constants and helpers to `@korre/mappings`

**Architecture:** New `src/permissions.ts` file with permission constants, matrices for org/project scopes, and helper functions. Follows existing package patterns (as const objects, label getters).

**Tech Stack:** TypeScript, Vitest

---

## File Structure

| File | Action | Purpose |
|------|--------|---------|
| `src/permissions.ts` | Create | Permission constants, matrices, helpers |
| `src/index.ts` | Modify | Add permissions export |
| `tests/mappings.test.ts` | Modify | Add permission tests |

---

### Task 1: Create Permission Constants

**Files:**
- Create: `src/permissions.ts`
- Test: `tests/mappings.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
// Add to tests/mappings.test.ts imports:
import {
  PERMISSION,
  hasPermission,
  getPermissionLabel,
  ORG_PERMISSIONS,
  PROJECT_PERMISSIONS,
} from "../src";

// Add inside describe block:
it("keeps permission constants stable", () => {
  expect(PERMISSION).toEqual({ WATCH: 0, EDIT: 1, MANAGE_ROLES: 2 });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test:run`
Expected: FAIL with "PERMISSION is not exported"

- [ ] **Step 3: Write minimal implementation**

```typescript
// src/permissions.ts
import { ORGANIZATION_ROLE, type OrganizationRole } from "./organization";
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

export const getPermissionLabel = createLabelGetter<Permission>(PERMISSION_LABEL);
```

- [ ] **Step 4: Add export to src/index.ts**

```typescript
export * from "./boards";
export * from "./issues";
export * from "./organization";
export * from "./permissions";
export * from "./projects";
export * from "./recent-views";
export * from "./request-logs";
export * from "./shared";
```

- [ ] **Step 5: Run test to verify it passes**

Run: `pnpm test:run`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/permissions.ts src/index.ts tests/mappings.test.ts
git commit -m "feat: add permission constants and label getter"
```

---

### Task 2: Add Permission Matrices

**Files:**
- Modify: `src/permissions.ts`
- Test: `tests/mappings.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
// Add inside describe block:
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test:run`
Expected: FAIL with "ORG_PERMISSIONS is not defined"

- [ ] **Step 3: Add permission matrices to src/permissions.ts**

```typescript
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test:run`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/permissions.ts tests/mappings.test.ts
git commit -m "feat: add org and project permission matrices"
```

---

### Task 3: Add hasPermission Helper

**Files:**
- Modify: `src/permissions.ts`
- Test: `tests/mappings.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
// Add inside describe block:
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test:run`
Expected: FAIL with "hasPermission is not a function"

- [ ] **Step 3: Add hasPermission to src/permissions.ts**

```typescript
export const hasPermission = (
  role: OrganizationRole,
  permission: Permission,
  scope: "organization" | "project" = "organization",
): boolean => {
  const matrix = scope === "organization" ? ORG_PERMISSIONS : PROJECT_PERMISSIONS;
  return matrix[role].includes(permission);
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test:run`
Expected: PASS

- [ ] **Step 5: Run typecheck**

Run: `pnpm typecheck`
Expected: No errors

- [ ] **Step 6: Commit**

```bash
git add src/permissions.ts tests/mappings.test.ts
git commit -m "feat: add hasPermission helper with scope support"
```

---

### Task 4: Verify All Tests Pass

**Files:**
- None (verification only)

- [ ] **Step 1: Run full test suite**

Run: `pnpm test:run`
Expected: All tests pass

- [ ] **Step 2: Run typecheck**

Run: `pnpm typecheck`
Expected: No errors

- [ ] **Step 3: Run build**

Run: `pnpm build`
Expected: Build succeeds

---

### Task 5: Add Delete Permission and canDelete Helper

**Files:**
- Modify: `src/permissions.ts`
- Test: `tests/mappings.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
// Add inside describe block:
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test:run`
Expected: FAIL with "canDelete is not a function"

- [ ] **Step 3: Update PERMISSION constant and PERMISSION_LABEL**

```typescript
export const PERMISSION = {
  WATCH: 0,
  EDIT: 1,
  MANAGE_ROLES: 2,
  DELETE: 3,
} as const;

export const PERMISSION_LABEL: Record<Permission, string> = {
  [PERMISSION.WATCH]: "Watch",
  [PERMISSION.EDIT]: "Edit",
  [PERMISSION.MANAGE_ROLES]: "Manage Roles",
  [PERMISSION.DELETE]: "Delete",
};
```

- [ ] **Step 4: Add canDelete to src/permissions.ts**

```typescript
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
```

- [ ] **Step 5: Run test to verify it passes**

Run: `pnpm test:run`
Expected: PASS

- [ ] **Step 6: Run typecheck**

Run: `pnpm typecheck`
Expected: No errors

- [ ] **Step 7: Commit**

```bash
git add src/permissions.ts tests/mappings.test.ts
git commit -m "feat: add DELETE permission and canDelete helper"
```

---

### Task 6: Final Verification

**Files:**
- None (verification only)

- [ ] **Step 1: Run full test suite**

Run: `pnpm test:run`
Expected: All tests pass

- [ ] **Step 2: Run typecheck**

Run: `pnpm typecheck`
Expected: No errors

- [ ] **Step 3: Run build**

Run: `pnpm build`
Expected: Build succeeds
