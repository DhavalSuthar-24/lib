import { AutoMap } from "@automapper/classes";
import { Weight, Money } from "../../domain";
import { ShipperAccount } from "./shipper-account";
import { DetailedCharge } from "./detailed-charge";

export class Rate {
  @AutoMap(() => Weight)
  public charge_weight: Weight;

  @AutoMap(() => Money)
  public total_charge: Money;

  @AutoMap(() => ShipperAccount)
  public shipper_account: ShipperAccount;

  @AutoMap()
  public service_type: string;

  @AutoMap()
  public service_name: string;

  @AutoMap()
  public pickup_deadline?: string;

  @AutoMap()
  public booking_cut_off?: string;

  @AutoMap(() => Date)
  public delivery_date?: Date;

  @AutoMap()
  public transit_time?: number;

  @AutoMap(() => [DetailedCharge])
  public detailed_charges: DetailedCharge[];

  @AutoMap()
  public error_message?: string;

  @AutoMap()
  public info_message?: string;
}
