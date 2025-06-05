import { AutoMap } from "@automapper/classes";

export class EstimatedDeliveryDateData {
  @AutoMap()
  public estimatedDeliveryDate: string;

  @AutoMap()
  public confidenceCode: number;

  @AutoMap()
  public estimatedDeliveryDateMin: string;

  @AutoMap()
  public estimatedDeliveryDateMax: string;
}
