import { ZERO_UUID } from "@bit-core-api/shared-utils-lib";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const OrganizationId = createParamDecorator((data: string, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  // TODO: remove this default ZERO_UUID, we have to use just the request.headers["x-organization-id"]
  return request.headers["x-organization-id"] ?? ZERO_UUID;
});
