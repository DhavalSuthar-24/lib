import { AutoMap } from "@automapper/classes";
import { Coordinates, EDeliveryStatus, EDeliverySubStatus, EShipperAccount, EventAfterShip } from "../../domain";
import { ECountryCodeIso3, EStateCodeIso2 } from "../../../types";

export class CheckpointModelData {
  @AutoMap(() => Date)
  public created_at: Date;

  @AutoMap(() => String)
  public slug: EShipperAccount;

  @AutoMap(() => Date)
  public checkpoint_time: Date;

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
  public country_iso3?: ECountryCodeIso3;

  @AutoMap()
  public country_name?: string;

  @AutoMap()
  public message: string;

  @AutoMap(() => String)
  public tag: EDeliveryStatus;

  @AutoMap(() => String)
  public subtag: EDeliverySubStatus;

  @AutoMap()
  public subtag_message: string;

  @AutoMap()
  public raw_tag?: string;

  @AutoMap(() => EventAfterShip)
  public events: EventAfterShip;
}
