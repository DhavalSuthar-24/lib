import { first } from "@bit-core-api/shared-utils-lib";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { IIdentity } from "../identity";
import { shouldAllowAnonymous } from "./should-allow-anonymous";

@Injectable()
export class BiometricsVerifiedGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    if (shouldAllowAnonymous(context, this.reflector)) {
      return true;
    }
    const identity = first(context.getArgs())?.user as IIdentity;
    return identity?.biometricsVerified ?? false;
  }
}
