import { ValidationError } from "@nestjs/common";
import { ErrorCodes, PublicBadRequestException } from "@bit-core-api/shared-base-lib";

export const ValidationErrorResponse = (validationErrors: ValidationError[]) => {
  const formattedErrors = validationErrors.map((error: any) => {
    return {
      field: error.property, // The field name
      message: Object.values(error.constraints).join(", "), // Extract error messages
    };
  });

  // Return the custom BadRequestException with the formatted errors
  return new PublicBadRequestException(ErrorCodes.INVALID_INPUT, formattedErrors);
};
