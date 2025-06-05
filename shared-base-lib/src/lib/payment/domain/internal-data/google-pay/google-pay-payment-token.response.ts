import { AutoMap } from "@automapper/classes";
import { GooglePayPaymentMethodDataResponse } from "./google-pay-payment-method-data.response";

export class GooglePayPaymentTokenResponse {
  @AutoMap(() => GooglePayPaymentMethodDataResponse)
  public paymentMethodData: GooglePayPaymentMethodDataResponse;

  @AutoMap()
  public ephemeralPublicKey: string;

  @AutoMap()
  public tag: string;

  @AutoMap()
  public paymentMethod: string;

  @AutoMap()
  public messageId: string;

  @AutoMap()
  public messageExpiration: string;
}
