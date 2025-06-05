import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { FlagsmithService } from "../services/flagsmith.service";
import { isNilOrEmpty } from "@bit-core-api/shared-utils-lib";
import { BaseFlagOutput } from "../interfaces";
import { BaseFlag } from "flagsmith-nodejs/build/cjs/sdk/models";

@Injectable()
export class FlagsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly flagsmithService: FlagsmithService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const featureFlag = this.reflector.get<string>("feature-flag", context.getHandler());
    if (!featureFlag) return true;

    const featureFlagDetails: BaseFlagOutput = await this.flagsmithService.isFeatureEnabled(featureFlag);

    if (isNilOrEmpty(featureFlagDetails)) {
      throw new ForbiddenException(`Feature ${featureFlag} is not enabled`);
    }
    return (featureFlagDetails as BaseFlag)?.enabled;
  }
}
