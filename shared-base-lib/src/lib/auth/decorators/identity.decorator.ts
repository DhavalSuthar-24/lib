import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { IIdentity } from "../identity";

export const Identity = createParamDecorator((data: string, ctx: ExecutionContext): IIdentity => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;
  return data ? user[data] : user;
});
