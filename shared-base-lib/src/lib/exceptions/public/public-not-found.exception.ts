import { PublicBaseException } from "./public-base.exception";
import { ErrorCodes, ErrorDetails, ErrorResponseCodes, ErrorStatusCodes } from "../../interceptors";

export type PublicNotFoundType = ErrorCodes.RESOURCE_NOT_FOUND | ErrorCodes.FILE_NOT_FOUND | ErrorCodes.INVALID_CLIENT_STATE | ErrorCodes.INVALID_ORGANIZATION_STATE;

export class PublicNotFoundException extends PublicBaseException {
  constructor(errorCode: PublicNotFoundType, errors?: ErrorDetails[] | undefined) {
    const errorDetails = ErrorResponseCodes[ErrorStatusCodes.NOT_FOUND].errorCodes[errorCode];
    const message = errorDetails ? errorDetails.message : "";
    super(
      PublicBaseException.createPayload(undefined, message, ErrorResponseCodes[ErrorStatusCodes.NOT_FOUND].status),
      ErrorResponseCodes[ErrorStatusCodes.NOT_FOUND].status,
      errorCode,
      errors,
      errorDetails?.details,
    );
  }
}
