export const BOARD_TYPE = {
  KANBAN: 0,
} as const;

export type BoardType = (typeof BOARD_TYPE)[keyof typeof BOARD_TYPE];
