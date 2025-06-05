import { isNilOrEmpty } from "@bit-core-api/shared-utils-lib";
import { IBaseFeatureFlagService } from "../interfaces/i-base-flag-service";
import { ConfigService } from "@nestjs/config";
import { Flags, Flagsmith } from "flagsmith-nodejs";
import { FlagSmithOptions } from "../options";
import { PinoLogger } from "nestjs-pino";
import { Injectable, Scope } from "@nestjs/common";
import { BaseFlagOutput } from "../interfaces";

@Injectable({ scope: Scope.REQUEST })
export class FlagsmithService implements IBaseFeatureFlagService {
  public flagsmith: Flagsmith | null = null;
  public flagsCache: Flags | null = null;
  public initiated: boolean = false;
  readonly REFRESH_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

  constructor(readonly configService: ConfigService, protected readonly logger: PinoLogger) {}

  async initFlagsmith(): Promise<void> {
    if (this.flagsmith) return;

    const config = this.configService.get<FlagSmithOptions>("flagSmith");
    if (!config?.apiKey) {
      this.logger.error("API key is not there", config);
      return;
    } else {
      this.flagsmith = new Flagsmith({
        environmentKey: config.apiKey,
        apiUrl: config.apiUrl,
      });

      this.logger.debug("FlagsmithService: Flagsmith instance initialized");
    }
  }

  initInBackground(): void {
    this.initFlagsmith()
      .then(() => {
        this.initiated = true;
        this.logger.debug("FlagsmithService: Background initialization complete");
      })
      .catch((err) => {
        this.logger.error("FlagsmithService: Init failed", err);
      });
  }

  async ensureInitialized(): Promise<void> {
    if (!this.initiated) {
      await this.initFlagsmith();
      this.initiated = true;
    }
  }

  async getFlags(): Promise<Flags> {
    if (this.flagsCache) {
      this.logger.debug("FlagsmithService: Returned flags from cache");
      return this.flagsCache;
    }

    await this.ensureInitialized();

    if (!this.flagsmith) throw new Error("Flagsmith is not initialized");

    this.flagsCache = await this.flagsmith.getEnvironmentFlags();
    return this.flagsCache;
  }

  async isFeatureEnabled(featureName: string): Promise<BaseFlagOutput> {
    const flags = await this.getFlags();
    const allFlags = flags.allFlags().map((e) => ({ ...e }));
    const featureFlagData = allFlags.find((flag) => flag.featureName === featureName);
    return isNilOrEmpty(featureFlagData) ? {} : featureFlagData;
  }
}
