import { applyDecorators, Type } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";

type ApiResponseMeta = {
  status: number;
  description: string;
  type?: any;
  isArray?: boolean;
};

export function StandardApiResponses(responses: ApiResponseMeta[]) {
  const decorators = responses.map(({ status, description, type, isArray }) => {
    return ApiResponse({ status, description, type, isArray });
  });

  return applyDecorators(...decorators);
}
