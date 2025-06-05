import { AutoMap } from "@automapper/classes";
import { Files } from "./files";
import { Rate } from "./rate";
import { ShipperAccount } from "./shipper-account";
import { EDeliveryLabelStatus } from "../../domain";

export class Label {
  @AutoMap()
  public id: string;

  @AutoMap(() => String)
  public status: EDeliveryLabelStatus;

  @AutoMap()
  public service_type: string;

  @AutoMap(() => Date)
  public ship_date: Date;

  @AutoMap(() => [String])
  public tracking_numbers: string[];

  @AutoMap(() => [Object])
  public carrier_references: unknown[];

  @AutoMap(() => Files)
  public files: Files;

  @AutoMap(() => Rate)
  public rate: Rate;

  @AutoMap(() => ShipperAccount)
  public shipper_account: ShipperAccount;

  @AutoMap(() => Date)
  public created_at: Date;

  @AutoMap(() => Date)
  public updated_at: Date;

  @AutoMap(() => [String])
  public references?: string[];

  @AutoMap()
  public order_number?: string;

  @AutoMap(() => [Object])
  public service_options?: unknown[];

  @AutoMap()
  public order_id?: string;

  @AutoMap(() => Object)
  public custom_fields?: Record<string, string>;
}
