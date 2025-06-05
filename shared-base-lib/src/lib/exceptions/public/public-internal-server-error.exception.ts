import { PublicBaseException } from "./public-base.exception";
import { ErrorCodes, ErrorDetails, ErrorResponseCodes, ErrorStatusCodes } from "../../interceptors";

export type PublicInternalServerErrorType = ErrorCodes.INTERNAL_SERVER_ERROR;

export class PublicInternalServerErrorException extends PublicBaseException {
  constructor(errorCode: PublicInternalServerErrorType, errors?: ErrorDetails[] | undefined) {
    const errorDetails = ErrorResponseCodes[ErrorStatusCodes.INTERNAL_SERVER_ERROR].errorCodes[errorCode];
    const message = errorDetails ? errorDetails.message : "";
    super(
      PublicBaseException.createPayload(undefined, message, ErrorResponseCodes[ErrorStatusCodes.INTERNAL_SERVER_ERROR].status),
      ErrorResponseCodes[ErrorStatusCodes.INTERNAL_SERVER_ERROR].status,
      errorCode,
      errors,
      errorDetails?.details,
    );
  }
}
