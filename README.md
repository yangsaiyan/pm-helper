# @korre/mappings

Shared TypeScript mapping constants for Korre project management apps.

## Install

```sh
pnpm add @korre/mappings
```

## Usage

```ts
import {
  ISSUE_PRIORITY,
  ISSUE_TYPE,
  getIssuePriorityLabel,
  mappingEntries,
  type IssuePriority,
} from "@korre/mappings";

const priority: IssuePriority = ISSUE_PRIORITY.HIGH;

console.log(priority);
console.log(getIssuePriorityLabel(priority));

const issueTypeOptions = mappingEntries(ISSUE_TYPE);
```

## Mappings

### Organization

```ts
ORGANIZATION_ROLE.OWNER; // 0
ORGANIZATION_ROLE.ADMIN; // 1
ORGANIZATION_ROLE.MEMBER; // 2
ORGANIZATION_ROLE.GUEST; // 3
```

### Projects

```ts
PROJECT_STATUS.ACTIVE; // 0
PROJECT_STATUS.ARCHIVED; // 1
```

### Boards

```ts
BOARD_TYPE.KANBAN; // 0

COLUMN_CATEGORY.TODO; // 0
COLUMN_CATEGORY.IN_PROGRESS; // 1
COLUMN_CATEGORY.DONE; // 2
```

### Issues

```ts
ISSUE_PRIORITY.LOW; // 0
ISSUE_PRIORITY.MEDIUM; // 1
ISSUE_PRIORITY.HIGH; // 2
ISSUE_PRIORITY.URGENT; // 3

ISSUE_TYPE.EPIC; // 0
ISSUE_TYPE.TASK; // 1
ISSUE_TYPE.BUG; // 2
ISSUE_TYPE.FEATURE; // 3
ISSUE_TYPE.SUBTASK; // 4
```

## Convention

Numeric values start at `0` for the default, lowest, or active state. Higher
values progress upward so sorting and filtering remain straightforward.

Examples:

```txt
Low < Medium < High < Urgent
Todo < In Progress < Done
```

## Development

```sh
pnpm install
pnpm test:run
pnpm run build
```
