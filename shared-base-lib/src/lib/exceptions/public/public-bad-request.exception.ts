import { PublicBaseException } from "./public-base.exception";
import { ErrorCodes, ErrorDetails, ErrorResponseCodes, ErrorStatusCodes } from "../../interceptors";

export type PublicBadRequestType = ErrorCodes.INVALID_INPUT | ErrorCodes.INVALID_FILE_TYPE | ErrorCodes.FILE_TOO_LARGE | ErrorCodes.MALFORMED_REQUEST;

export class PublicBadRequestException extends PublicBaseException {
  constructor(errorCode: PublicBadRequestType, errors?: ErrorDetails[] | undefined) {
    const errorDetails = ErrorResponseCodes[ErrorStatusCodes.BAD_REQUEST].errorCodes[errorCode];
    const message = errorDetails ? errorDetails.message : "";
    super(
      PublicBaseException.createPayload(undefined, message, ErrorResponseCodes[ErrorStatusCodes.BAD_REQUEST].status),
      ErrorResponseCodes[ErrorStatusCodes.BAD_REQUEST].status,
      errorCode,
      errors,
      errorDetails?.details,
    );
  }
}
