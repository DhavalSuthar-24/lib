import { AutoMap } from "@automapper/classes";
import { EEstimateDeliverySource, EEstimateDeliveryType } from "../../enums";

export class EstimatedDeliveryData {
  @AutoMap(() => String)
  public type: EEstimateDeliveryType;

  @AutoMap(() => String)
  public source: EEstimateDeliverySource;

  @AutoMap()
  public datetime?: string;

  @AutoMap()
  public datetimeMin?: string;

  @AutoMap()
  public datetimeMax?: string;
}
