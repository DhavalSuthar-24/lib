import { AutoMap } from "@automapper/classes";
import { OrderResponse } from "./internal-data";

export class TaxOrderResponse {
  @AutoMap(() => OrderResponse)
  public order: OrderResponse;
}
