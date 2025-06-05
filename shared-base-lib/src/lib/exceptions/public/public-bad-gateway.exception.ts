import { PublicBaseException } from "./public-base.exception";
import { ErrorCodes, ErrorDetails, ErrorResponseCodes, ErrorStatusCodes } from "../../interceptors";

export type PublicBadGatewayType = ErrorCodes.BAD_GATEWAY;

export class PublicBadGatewayException extends PublicBaseException {
  constructor(errorCode: PublicBadGatewayType, errors?: ErrorDetails[] | undefined) {
    const errorDetails = ErrorResponseCodes[ErrorStatusCodes.BAD_GATEWAY].errorCodes[errorCode];
    const message = errorDetails ? errorDetails.message : "";
    super(
      PublicBaseException.createPayload(undefined, message, ErrorResponseCodes[ErrorStatusCodes.BAD_GATEWAY].status),
      ErrorResponseCodes[ErrorStatusCodes.BAD_GATEWAY].status,
      errorCode,
      errors,
      errorDetails?.details,
    );
  }
}
