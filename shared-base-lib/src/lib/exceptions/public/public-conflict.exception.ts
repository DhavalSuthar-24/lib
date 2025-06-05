import { PublicBaseException } from "./public-base.exception";
import { ErrorCodes, ErrorDetails, ErrorResponseCodes, ErrorStatusCodes } from "../../interceptors";

export type PublicConflictType = ErrorCodes.BUSINESS_RULE_VIOLATION | ErrorCodes.RESOURCE_ALREADY_EXISTS;

export class PublicConflictException extends PublicBaseException {
  constructor(errorCode: PublicConflictType, errors?: ErrorDetails[] | undefined) {
    const errorDetails = ErrorResponseCodes[ErrorStatusCodes.CONFLICT].errorCodes[errorCode];
    const message = errorDetails ? errorDetails.message : "";
    super(
      PublicBaseException.createPayload(undefined, message, ErrorResponseCodes[ErrorStatusCodes.CONFLICT].status),
      ErrorResponseCodes[ErrorStatusCodes.CONFLICT].status,
      errorCode,
      errors,
      errorDetails?.details,
    );
  }
}
