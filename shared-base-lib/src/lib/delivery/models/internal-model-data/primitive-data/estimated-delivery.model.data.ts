import { AutoMap } from "@automapper/classes";
import { EEstimateDeliverySource, EEstimateDeliveryType } from "../../../domain";

export class EstimatedDeliveryModelData {
  @AutoMap(() => String)
  public type: EEstimateDeliveryType;

  @AutoMap(() => String)
  public source: EEstimateDeliverySource;

  @AutoMap()
  public datetime?: string;

  @AutoMap()
  public datetime_min?: string;

  @AutoMap()
  public datetime_max?: string;
}
