import { AutoMap } from "@automapper/classes";
import { ApplePayPaymentDataResponse } from ".";
import { ApplePayPaymentMethodResponse } from ".";

export class ApplePayTokenResponse {
  @AutoMap(() => ApplePayPaymentDataResponse)
  public paymentData: ApplePayPaymentDataResponse;

  @AutoMap(() => ApplePayPaymentMethodResponse)
  public paymentMethod: ApplePayPaymentMethodResponse;

  @AutoMap()
  public transactionIdentifier: string;
}
