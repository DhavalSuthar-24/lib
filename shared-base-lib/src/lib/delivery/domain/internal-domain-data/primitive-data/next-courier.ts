import { AutoMap } from "@automapper/classes";
import { EShipperAccount } from "../../enums";

export class NextCourier {
  @AutoMap()
  public slug: EShipperAccount;

  @AutoMap()
  public tracking_number: string;

  @AutoMap()
  public source?: string;
}
