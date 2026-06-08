export const BOARD_TYPE = {
  KANBAN: 0,
  EXPENSES_CLAIM: 1,
  VENUE_BOOKING: 2,
} as const;

export type BoardType = (typeof BOARD_TYPE)[keyof typeof BOARD_TYPE];
