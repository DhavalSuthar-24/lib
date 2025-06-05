import { AutoMap } from "@automapper/classes";

export class EstimatedDeliveryDateModelData {
  @AutoMap()
  public estimated_delivery_date: string;

  @AutoMap()
  public confidence_code: number;

  @AutoMap()
  public estimated_delivery_date_min: string;

  @AutoMap()
  public estimated_delivery_date_max: string;
}
