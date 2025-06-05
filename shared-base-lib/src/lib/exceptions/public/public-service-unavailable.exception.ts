import { PublicBaseException } from "./public-base.exception";
import { ErrorCodes, ErrorDetails, ErrorResponseCodes, ErrorStatusCodes } from "../../interceptors";

export type PublicServiceUnavailableType = ErrorCodes.SERVICE_UNAVAILABLE | ErrorCodes.MAINTENANCE_MODE;

export class PublicServiceUnavailableException extends PublicBaseException {
  constructor(errorCode: PublicServiceUnavailableType, errors?: ErrorDetails[] | undefined) {
    const errorDetails = ErrorResponseCodes[ErrorStatusCodes.SERVICE_UNAVAILABLE].errorCodes[errorCode];
    const message = errorDetails ? errorDetails.message : "";
    super(
      PublicBaseException.createPayload(undefined, message, ErrorResponseCodes[ErrorStatusCodes.SERVICE_UNAVAILABLE].status),
      ErrorResponseCodes[ErrorStatusCodes.SERVICE_UNAVAILABLE].status,
      errorCode,
      errors,
      errorDetails?.details,
    );
  }
}
