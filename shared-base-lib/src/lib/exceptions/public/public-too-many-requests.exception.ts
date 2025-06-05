import { PublicBaseException } from "./public-base.exception";
import { ErrorCodes, ErrorDetails, ErrorResponseCodes, ErrorStatusCodes } from "../../interceptors";

export type PublicTooManyRequestType = ErrorCodes.RATE_LIMIT_EXCEEDED | ErrorCodes.THROTTLE_LIMIT_REACHED | ErrorCodes.API_QUOTA_EXCEEDED;

export class PublicTooManyRequestsException extends PublicBaseException {
  constructor(errorCode: PublicTooManyRequestType, errors?: ErrorDetails[] | undefined) {
    const errorDetails = ErrorResponseCodes[ErrorStatusCodes.TOO_MANY_REQUESTS].errorCodes[errorCode];
    const message = errorDetails ? errorDetails.message : "";
    super(
      PublicBaseException.createPayload(undefined, message, ErrorResponseCodes[ErrorStatusCodes.TOO_MANY_REQUESTS].status),
      ErrorResponseCodes[ErrorStatusCodes.TOO_MANY_REQUESTS].status,
      errorCode,
      errors,
      errorDetails?.details,
    );
  }
}
