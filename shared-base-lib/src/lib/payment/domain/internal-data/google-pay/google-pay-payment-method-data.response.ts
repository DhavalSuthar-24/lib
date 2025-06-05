import { AutoMap } from "@automapper/classes";
import { GooglePayPaymentMethodInfoResponse } from "./google-pay-payment-method-info.response";

export class GooglePayPaymentMethodDataResponse {
  @AutoMap()
  public description: string;

  @AutoMap()
  public type: string;

  @AutoMap(() => GooglePayPaymentMethodInfoResponse)
  public info: GooglePayPaymentMethodInfoResponse;
}
