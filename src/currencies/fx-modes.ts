import { createLabelGetter } from "../shared";

export const FX_MODE = {
  DECLARED: 0,
  TABLE: 1,
} as const;

export type FxMode = (typeof FX_MODE)[keyof typeof FX_MODE];

export const FX_MODE_LABEL: Record<FxMode, string> = {
  [FX_MODE.DECLARED]: "Bank charge",
  [FX_MODE.TABLE]: "Converted at rate",
};

export const getFxModeLabel = createLabelGetter<FxMode>(FX_MODE_LABEL);
