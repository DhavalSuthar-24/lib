import { AutoMap } from "@automapper/classes";
import { GooglePayPaymentTokenResponse } from "./google-pay-payment-token.response";

export class GooglePay {
  @AutoMap(() => GooglePayPaymentTokenResponse)
  public googlePayPaymentToken: GooglePayPaymentTokenResponse;
}
