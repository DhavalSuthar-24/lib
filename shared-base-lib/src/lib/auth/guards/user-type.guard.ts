import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { BIT_TYPE_META } from "../constants";
import { first, isNilOrEmpty, some } from "@bit-core-api/shared-utils-lib";
import { IIdentity } from "../identity";
import { shouldAllowAnonymous } from "./should-allow-anonymous";

@Injectable()
export class UserTypeGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    if (shouldAllowAnonymous(context, this.reflector)) {
      return true;
    }
    const routeTypes = this.reflector.get<string[]>(BIT_TYPE_META, context.getHandler());
    if (isNilOrEmpty(routeTypes)) return true;

    const identity = first(context.getArgs()).user as IIdentity;
    const type = identity.userType;
    return some(routeTypes, (rt) => rt === type);
  }
}
