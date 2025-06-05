import { ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ALLOW_ANONYMOUS_META } from "../constants";

export const shouldAllowAnonymous = (ctx: ExecutionContext, reflector: Reflector): boolean =>
  reflector.get(ALLOW_ANONYMOUS_META, ctx.getHandler());
