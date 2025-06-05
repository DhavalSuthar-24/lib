import { AutoMap } from "@automapper/classes";
import { ApplePayPaymentTokenResponse } from "./apple-pay-payment-token.response";

export class ApplePay {
  @AutoMap(() => ApplePayPaymentTokenResponse)
  public applePayPaymentToken: ApplePayPaymentTokenResponse;
}
