import { PublicBaseException } from "./public-base.exception";
import { ErrorCodes, ErrorDetails, ErrorResponseCodes, ErrorStatusCodes } from "../../interceptors";

export type PublicUpgradeRequiredType = ErrorCodes.API_VERSION_NOT_SUPPORTED | ErrorCodes.API_VERSION_DEPRECATED;

export class PublicUpgradeRequiredException extends PublicBaseException {
  constructor(errorCode: PublicUpgradeRequiredType, errors?: ErrorDetails[] | undefined) {
    const errorDetails = ErrorResponseCodes[ErrorStatusCodes.UPGRADE_REQUIRED].errorCodes[errorCode];
    const message = errorDetails ? errorDetails.message : "";
    super(
      PublicBaseException.createPayload(undefined, message, ErrorResponseCodes[ErrorStatusCodes.UPGRADE_REQUIRED].status),
      ErrorResponseCodes[ErrorStatusCodes.UPGRADE_REQUIRED].status,
      errorCode,
      errors,
      errorDetails?.details,
    );
  }
}
