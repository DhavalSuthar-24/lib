import { AutoMap } from "@automapper/classes";
import { Billing, Customs, Shipment } from "./internal-model-data";
import { ShipperAccountId } from "../domain";

export class CreateLabelRequest {
  @AutoMap(() => Billing)
  public billing?: Billing;

  @AutoMap(() => Customs)
  public customs?: Customs;

  @AutoMap()
  public return_shipment?: boolean; // default: false

  @AutoMap()
  public is_document?: boolean; // default: false

  @AutoMap()
  public service_type: string;

  @AutoMap()
  public paper_size: string;

  @AutoMap(() => ShipperAccountId)
  public shipper_account: ShipperAccountId;

  @AutoMap(() => [String])
  public references?: string[];

  @AutoMap(() => Shipment)
  public shipment: Shipment;

  @AutoMap(() => Date)
  public ship_date?: Date; // default: today

  @AutoMap()
  public order_number?: string;

  @AutoMap()
  public order_id?: string;
}
