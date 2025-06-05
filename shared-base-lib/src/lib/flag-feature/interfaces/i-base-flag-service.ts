import { Flags } from "flagsmith-nodejs";
import { BaseFlagOutput } from "./i-base-flags.interface";

export interface IBaseFeatureFlagService {
  isFeatureEnabled(flag: string): Promise<BaseFlagOutput>;
  getFlags(): Promise<Flags>;
  initInBackground(): void;
}
