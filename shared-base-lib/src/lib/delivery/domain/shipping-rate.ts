import { AutoMap } from "@automapper/classes";
import { ECurrencyCode } from "../../payment";

export class ShippingRate {
  @AutoMap()
  public carrierAccountId: string;

  @AutoMap()
  public serviceType: string;

  @AutoMap()
  public slug: string;

  @AutoMap()
  public serviceName: string;

  @AutoMap()
  public totalCharge: number;

  @AutoMap(() => String)
  public currency: ECurrencyCode;

  @AutoMap(() => Date)
  public deliveryDate?: Date;

  @AutoMap()
  public transitTime?: number;

  @AutoMap()
  public infoMessage?: string;

  @AutoMap()
  public errorMessage?: string;
}
