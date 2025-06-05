import { ApplePayTokenResponse } from "./apple-pay-token.response";
import { AutoMap } from "@automapper/classes";

export class ApplePayPaymentTokenResponse {
  @AutoMap(() => ApplePayTokenResponse)
  public token: ApplePayTokenResponse;
}
