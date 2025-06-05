import { AutoMap } from "@automapper/classes";

export class GooglePayPaymentMethodInfoResponse {
  @AutoMap()
  public cardNetwork: string;

  @AutoMap()
  public cardDetails: string;
}
