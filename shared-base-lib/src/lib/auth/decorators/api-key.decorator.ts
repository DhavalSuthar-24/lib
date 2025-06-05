import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { API_KEY_HEADER } from "../constants";

export const ApiKey = createParamDecorator((data: string, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  const headers = request.headers;
  if (request && headers) {
    return request.headers[API_KEY_HEADER];
  }
  return null;
});
