import { AutoMap } from "@automapper/classes";
import { EShipperAccountStatus } from "./enums";

export class CarrierAccount {
  @AutoMap()
  public id: string;

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

  @AutoMap(() => Date)
  public createdAt: Date;

  @AutoMap(() => Date)
  public updatedAt: Date;
}
