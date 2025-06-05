import { AutoMap } from "@automapper/classes";
import { ECurrencyCode } from "../../payment";
import { EDeliveryLabelStatus } from "./enums";

export class ShippingLabel {
  @AutoMap()
  public id: string;

  @AutoMap(() => String)
  public status: EDeliveryLabelStatus;

  @AutoMap()
  public carrierAccountId: string;

  @AutoMap()
  public serviceType: string;

  @AutoMap()
  public slug: string;

  @AutoMap()
  public serviceName: string;

  @AutoMap()
  public trackingNumber: string;

  @AutoMap()
  public url: string;

  @AutoMap()
  public totalCharge: number;

  @AutoMap(() => String)
  public currency: ECurrencyCode;

  @AutoMap(() => Date)
  public shipDate: Date;

  @AutoMap(() => Date)
  public createdAt: Date;

  @AutoMap(() => Date)
  public updatedAt: Date;

  @AutoMap(() => Date)
  public deliveryDate?: Date;

  @AutoMap()
  public transitTime?: number;

  @AutoMap()
  public infoMessage?: string;

  @AutoMap()
  public errorMessage?: string;

  @AutoMap()
  public orderId?: string;
}
