import { ProcessPaymentRequest } from "./process-payment.request";
import { ECurrencyCode } from "./enums";

export class ProcessStandaloneCreditRequest extends ProcessPaymentRequest {
  constructor(merchantRefNum: string, amount: number, currencyCode: ECurrencyCode, paymentHandleToken: string) {
    super(merchantRefNum, amount, currencyCode, paymentHandleToken);
  }
}
