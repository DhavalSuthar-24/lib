import { AutoMap } from "@automapper/classes";

export class ApplePayPaymentMethodResponse {
  @AutoMap()
  public displayName: string;

  @AutoMap()
  public network: string;

  @AutoMap()
  public type: string;
}
