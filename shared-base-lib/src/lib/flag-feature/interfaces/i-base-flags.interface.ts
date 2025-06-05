export interface Flag {
  enabled: boolean;
  value: string;
  isDefault: boolean;
  featureId: number;
  featureName: string;
}

export interface FlagsmithFlags {
  flags: Record<string, Flag>;
  defaultFlagHandler?: unknown;
  analyticsProcessor?: unknown;
}

export type BaseFlagOutput = Flag | {};
