import { AutoMap } from "@automapper/classes";
import { AddressData, ELocale, EProfileStatus, SingleUsePaymentHandle } from ".";

export class SingleUseCustomerTokensResponse {
  @AutoMap()
  public id: string;

  @AutoMap()
  public timeToLiveSeconds: number;

  @AutoMap(() => String)
  public status: EProfileStatus;

  @AutoMap()
  public singleUseCustomerToken: string;

  @AutoMap(() => String)
  public locale: ELocale;

  @AutoMap(() => [AddressData])
  public addresses: AddressData[];

  @AutoMap(() => [SingleUsePaymentHandle])
  public paymentHandles: SingleUsePaymentHandle[];

  @AutoMap()
  public customerId: string;
}
