import { PublicBaseException } from "./public-base.exception";
import { ErrorCodes, ErrorDetails, ErrorResponseCodes, ErrorStatusCodes } from "../../interceptors";

export type PublicGatewayTimeoutType = ErrorCodes.GATEWAY_TIMEOUT;

export class PublicGatewayTimeoutException extends PublicBaseException {
  constructor(errorCode: PublicGatewayTimeoutType, errors?: ErrorDetails[] | undefined) {
    const errorDetails = ErrorResponseCodes[ErrorStatusCodes.GATEWAY_TIMEOUT].errorCodes[errorCode];
    const message = errorDetails ? errorDetails.message : "";
    super(
      PublicBaseException.createPayload(undefined, message, ErrorResponseCodes[ErrorStatusCodes.GATEWAY_TIMEOUT].status),
      ErrorResponseCodes[ErrorStatusCodes.GATEWAY_TIMEOUT].status,
      errorCode,
      errors,
      errorDetails?.details,
    );
  }
}
