import { createLabelGetter } from "../shared";

export const CLAIM_TYPE = {
  RECEIPT: 0,
  MILEAGE: 1,
  PER_DIEM: 2,
} as const;

export type ClaimType = (typeof CLAIM_TYPE)[keyof typeof CLAIM_TYPE];

export const CLAIM_TYPE_LABEL: Record<ClaimType, string> = {
  [CLAIM_TYPE.RECEIPT]: "Receipt",
  [CLAIM_TYPE.MILEAGE]: "Mileage",
  [CLAIM_TYPE.PER_DIEM]: "Per diem",
};

export const getClaimTypeLabel = createLabelGetter<ClaimType>(CLAIM_TYPE_LABEL);
