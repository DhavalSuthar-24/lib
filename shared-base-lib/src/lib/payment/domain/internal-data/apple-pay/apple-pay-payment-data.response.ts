import { AutoMap } from "@automapper/classes";
import { ApplePayHeaderResponse } from "./apple-pay-header.response";

export class ApplePayPaymentDataResponse {
  @AutoMap()
  public version: string;

  @AutoMap()
  public data: string;

  @AutoMap()
  public signature: string;

  @AutoMap(() => ApplePayHeaderResponse)
  public header: ApplePayHeaderResponse;

  @AutoMap()
  public decryptedData?: string;
}
