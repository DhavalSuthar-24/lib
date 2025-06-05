import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { LAMBDA_STRATEGY } from "../constants";
import { shouldAllowAnonymous } from "./should-allow-anonymous";

@Injectable()
export class LambdaAuthorization extends AuthGuard(LAMBDA_STRATEGY) {
  constructor(private reflector: Reflector) {
    super();
  }

  public override canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return shouldAllowAnonymous(context, this.reflector) || super.canActivate(context);
  }
}
