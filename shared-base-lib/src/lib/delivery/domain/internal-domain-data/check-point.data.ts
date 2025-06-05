import { AutoMap } from "@automapper/classes";
import { Coordinates, EDeliveryStatus, EDeliverySubStatus, EShipperAccount, EventAfterShip } from "../../domain";
import { ECountryCodeIso3, EStateCodeIso2 } from "../../../types";

export class CheckpointData {
  @AutoMap(() => Date)
  public createdAt: Date;

  @AutoMap(() => String)
  public slug: EShipperAccount;

  @AutoMap(() => Date)
  public checkpointTime: Date;

  @AutoMap()
  public location?: string;

  @AutoMap()
  public city?: string;

  @AutoMap(() => String)
  public state?: EStateCodeIso2;

  @AutoMap()
  public zip?: string;

  @AutoMap(() => Coordinates)
  public coordinate: Coordinates;

  @AutoMap(() => String)
  public countryIso3?: ECountryCodeIso3;

  @AutoMap()
  public countryName?: string;

  @AutoMap()
  public message: string;

  @AutoMap(() => String)
  public tag: EDeliveryStatus;

  @AutoMap(() => String)
  public subtag: EDeliverySubStatus;

  @AutoMap()
  public subtagMessage: string;

  @AutoMap()
  public rawTag?: string;

  @AutoMap(() => EventAfterShip)
  public events: EventAfterShip;
}
