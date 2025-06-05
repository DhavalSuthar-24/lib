import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { IAuthClient } from "../identity";

export const AuthClient = createParamDecorator((data: string, ctx: ExecutionContext): IAuthClient => {
  const request = ctx.switchToHttp().getRequest();
  const client = request.client;
  return data ? client[data] : client;
});
