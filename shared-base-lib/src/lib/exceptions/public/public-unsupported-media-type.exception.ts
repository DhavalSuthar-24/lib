import { PublicBaseException } from "./public-base.exception";
import { ErrorCodes, ErrorDetails, ErrorResponseCodes, ErrorStatusCodes } from "../../interceptors";

export type PublicUnSupportedMediaType = ErrorCodes.UNSUPPORTED_MEDIA_TYPE | ErrorCodes.INVALID_CONTENT_TYPE | ErrorCodes.UNSUPPORTED_FILE_FORMAT;

export class PublicUnSupportedMediaTypeException extends PublicBaseException {
  constructor(errorCode: PublicUnSupportedMediaType, errors?: ErrorDetails[] | undefined) {
    const errorDetails = ErrorResponseCodes[ErrorStatusCodes.UNSUPPORTED_MEDIA_TYPE].errorCodes[errorCode];
    const message = errorDetails ? errorDetails.message : "";
    super(
      PublicBaseException.createPayload(undefined, message, ErrorResponseCodes[ErrorStatusCodes.UNSUPPORTED_MEDIA_TYPE].status),
      ErrorResponseCodes[ErrorStatusCodes.UNSUPPORTED_MEDIA_TYPE].status,
      errorCode,
      errors,
      errorDetails?.details,
    );
  }
}
