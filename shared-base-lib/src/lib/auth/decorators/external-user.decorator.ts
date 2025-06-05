import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { EXTERN_USER_REQ_PROP } from "../constants";

export const ExternalUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request[EXTERN_USER_REQ_PROP];
    return data ? user[data] : user;
  }
);