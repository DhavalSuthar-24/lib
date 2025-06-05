import { PublicBaseException } from "./public-base.exception";
import { ErrorCodes, ErrorDetails, ErrorResponseCodes, ErrorStatusCodes } from "../../interceptors";

export type PublicUnauthorizedType =
  | ErrorCodes.TOKEN_EXPIRED
  | ErrorCodes.TOKEN_REVOKED
  | ErrorCodes.INVALID_CREDENTIALS
  | ErrorCodes.INVALID_TOKEN
  | ErrorCodes.UNAUTHORIZED_ACCESS;

export class PublicUnauthorizedException extends PublicBaseException {
  constructor(errorCode: PublicUnauthorizedType, errors?: ErrorDetails[] | undefined) {
    const errorDetails = ErrorResponseCodes[ErrorStatusCodes.UNAUTHORIZED].errorCodes[errorCode];
    const message = errorDetails ? errorDetails.message : "";
    super(
      PublicBaseException.createPayload(undefined, message, ErrorResponseCodes[ErrorStatusCodes.UNAUTHORIZED].status),
      ErrorResponseCodes[ErrorStatusCodes.UNAUTHORIZED].status,
      errorCode,
      errors,
      errorDetails?.details,
    );
  }
}
