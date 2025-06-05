import { PublicBaseException } from "./public-base.exception";
import { ErrorCodes, ErrorDetails, ErrorResponseCodes, ErrorStatusCodes } from "../../interceptors";

export type PublicForbiddenType = ErrorCodes.FORBIDDEN | ErrorCodes.INSUFFICIENT_PERMISSIONS | ErrorCodes.ORGANIZATION_RESTRICTED;

export class PublicForbiddenException extends PublicBaseException {
  constructor(errorCode: PublicForbiddenType, errors?: ErrorDetails[] | undefined) {
    const errorDetails = ErrorResponseCodes[ErrorStatusCodes.FORBIDDEN].errorCodes[errorCode];
    const message = errorDetails ? errorDetails.message : "";
    super(
      PublicBaseException.createPayload(undefined, message, ErrorResponseCodes[ErrorStatusCodes.FORBIDDEN].status),
      ErrorResponseCodes[ErrorStatusCodes.FORBIDDEN].status,
      errorCode,
      errors,
      errorDetails?.details,
    );
  }
}
