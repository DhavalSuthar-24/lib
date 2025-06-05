import { AutoMap } from "@automapper/classes";
import { Shipment } from "./internal-model-data";
import { ShipperAccountId } from "../domain";

export class CalculateRatesRequest {
  @AutoMap()
  public async: boolean; // default: false

  @AutoMap()
  public is_document: boolean; // default: false

  @AutoMap(() => Date)
  public ship_date: Date; // default: today

  @AutoMap(() => [ShipperAccountId])
  public shipper_accounts: ShipperAccountId[];

  @AutoMap(() => Shipment)
  public shipment: Shipment;
}
