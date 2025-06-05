import { PublicBaseException } from "./public-base.exception";
import { ErrorCodes, ErrorDetails, ErrorResponseCodes, ErrorStatusCodes } from "../../interceptors";

export type PublicPaymentType = ErrorCodes.INSUFFICIENT_BALANCE | ErrorCodes.PAYMENT_REQUIRED | ErrorCodes.PAYMENT_FAILED | ErrorCodes.INVOICE_OVERDUE;

export class PublicPaymentException extends PublicBaseException {
  constructor(errorCode: PublicPaymentType, errors?: ErrorDetails[] | undefined) {
    const errorDetails = ErrorResponseCodes[ErrorStatusCodes.PAYMENT_REQUIRED].errorCodes[errorCode];
    const message = errorDetails ? errorDetails.message : "";
    super(
      PublicBaseException.createPayload(undefined, message, ErrorResponseCodes[ErrorStatusCodes.PAYMENT_REQUIRED].status),
      ErrorResponseCodes[ErrorStatusCodes.PAYMENT_REQUIRED].status,
      errorCode,
      errors,
      errorDetails?.details,
    );
  }
}
