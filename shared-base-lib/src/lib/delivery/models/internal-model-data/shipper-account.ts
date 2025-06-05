import { AutoMap } from "@automapper/classes";
import { AddressAfterShipModel } from "./address.after-ship.model";
import { EShipperAccountStatus, Settings } from "../../domain";

export class ShipperAccount {
  @AutoMap()
  public id: string;

  @AutoMap(() => AddressAfterShipModel)
  public address: AddressAfterShipModel;

  @AutoMap()
  public slug: string;

  @AutoMap(() => String)
  public status: EShipperAccountStatus;

  @AutoMap()
  public description: string;

  @AutoMap()
  public type: string;

  @AutoMap()
  public timezone: string;

  @AutoMap(() => Settings)
  public settings: Settings;

  @AutoMap(() => Date)
  public created_at: Date;

  @AutoMap(() => Date)
  public updated_at: Date;
}
