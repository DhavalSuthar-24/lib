import { PublicBaseException } from "./public-base.exception";
import { ErrorCodes, ErrorDetails, ErrorResponseCodes, ErrorStatusCodes } from "../../interceptors";

export type PublicMethodNotAllowedType = ErrorCodes.METHOD_NOT_ALLOWED;

export class PublicMethodNotAllowedException extends PublicBaseException {
  constructor(errorCode: PublicMethodNotAllowedType, errors?: ErrorDetails[] | undefined) {
    const errorDetails = ErrorResponseCodes[ErrorStatusCodes.METHOD_NOT_ALLOWED].errorCodes[errorCode];
    const message = errorDetails ? errorDetails.message : "";
    super(
      PublicBaseException.createPayload(undefined, message, ErrorResponseCodes[ErrorStatusCodes.METHOD_NOT_ALLOWED].status),
      ErrorResponseCodes[ErrorStatusCodes.METHOD_NOT_ALLOWED].status,
      errorCode,
      errors,
      errorDetails?.details,
    );
  }
}
