import { DynamicModule, Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import {
  AdminJwtStrategy,
  Authentication,
  Authorization,
  BiometricsVerifiedGuard,
  BitJwtStrategy,
  EmailVerifiedGuard,
  EndUserJwtStrategy,
  LambdaJwtStrategy,
  LambdaAuthorization,
  RolesGuard,
  UserTypeGuard,
} from "./auth";
import { CqrsMediator } from "./cqrs";
import { FlagsGuard } from "./flag-feature";
import { FlagsmithService } from "./flag-feature/services/flagsmith.service";
import { FeatureFlagInterceptor } from "./flag-feature/interceptor";

@Module({})
export class SharedBaseLibModule {
  public static forRoot(): DynamicModule {
    return {
      global: true,
      module: SharedBaseLibModule,
      imports: [CqrsModule],
      providers: [
        CqrsMediator,
        AdminJwtStrategy,
        EndUserJwtStrategy,
        BitJwtStrategy,
        Authentication,
        Authorization,
        BiometricsVerifiedGuard,
        EmailVerifiedGuard,
        RolesGuard,
        FlagsGuard,
        UserTypeGuard,
        LambdaJwtStrategy,
        LambdaAuthorization,
        FlagsmithService,
        FeatureFlagInterceptor,
      ],
      exports: [
        CqrsMediator,
        FlagsGuard,
        AdminJwtStrategy,
        EndUserJwtStrategy,
        BitJwtStrategy,
        Authentication,
        Authorization,
        BiometricsVerifiedGuard,
        EmailVerifiedGuard,
        RolesGuard,
        UserTypeGuard,
        LambdaJwtStrategy,
        LambdaAuthorization,
        FlagsmithService,
        FeatureFlagInterceptor,
      ],
    };
  }
}
