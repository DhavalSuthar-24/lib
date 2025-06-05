import { AutoMap } from "@automapper/classes";
import { ShipperAccount } from "./shipper-account";

export class Data {
  @AutoMap()
  public next_token: string;

  @AutoMap()
  public limit: number;

  @AutoMap(() => [ShipperAccount])
  public shipper_accounts: ShipperAccount[];
}
