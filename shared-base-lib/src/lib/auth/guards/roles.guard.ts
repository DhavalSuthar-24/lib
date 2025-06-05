import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { BIT_ROLES_META } from "../constants";
import { first, includes, isNilOrEmpty, some } from "@bit-core-api/shared-utils-lib";
import { IIdentity, ERole } from "../identity";
import { shouldAllowAnonymous } from "./should-allow-anonymous";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    if (shouldAllowAnonymous(context, this.reflector)) {
      return true;
    }
    const routeRoles = this.reflector.get<string[]>(BIT_ROLES_META, context.getHandler());
    if (isNilOrEmpty(routeRoles)) {
      return true;
    }
    const identity = first(context.getArgs()).user as IIdentity;
    if (isNilOrEmpty(identity)) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const organizationId = request.headers["x-organization-id"] ?? null;
    const roles = identity.roles;

    return (
      some(routeRoles, (rRole: ERole) => includes(roles.global, rRole)) ||
      (!isNilOrEmpty(identity.roles.orgs[organizationId]) && some(routeRoles, (rRole: ERole) => includes(identity.roles.orgs[organizationId].roles, rRole)))
    );
  }
}
