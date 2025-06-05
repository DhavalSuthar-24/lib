import { SetMetadata } from "@nestjs/common";

export const FeatureFlag = (flagName: string) => SetMetadata("feature-flag", flagName);
