import { createLabelGetter } from "../shared";

export const ASSET_TYPE = {
  VEHICLE: 0,
  LAPTOP: 1,
  PROJECTOR: 2,
  EQUIPMENT: 3,
  FURNITURE: 4,
  MONITOR: 5,
  PRINTER: 6,
  CAMERA: 7,
  TABLET: 8,
  MOBILE_DEVICE: 9,
  OTHER: 10,
} as const;

export type AssetType = (typeof ASSET_TYPE)[keyof typeof ASSET_TYPE];

export const ASSET_TYPE_LABEL: Record<AssetType, string> = {
  [ASSET_TYPE.VEHICLE]: "Vehicle",
  [ASSET_TYPE.LAPTOP]: "Laptop",
  [ASSET_TYPE.PROJECTOR]: "Projector",
  [ASSET_TYPE.EQUIPMENT]: "Equipment",
  [ASSET_TYPE.FURNITURE]: "Furniture",
  [ASSET_TYPE.MONITOR]: "Monitor",
  [ASSET_TYPE.PRINTER]: "Printer",
  [ASSET_TYPE.CAMERA]: "Camera",
  [ASSET_TYPE.TABLET]: "Tablet",
  [ASSET_TYPE.MOBILE_DEVICE]: "Mobile Device",
  [ASSET_TYPE.OTHER]: "Other",
};

export const getAssetTypeLabel = createLabelGetter<AssetType>(ASSET_TYPE_LABEL);
