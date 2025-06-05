import { AutoMap } from "@automapper/classes";
import { ECalculateDeliveryRateStatus } from "../../domain";
import { Rate } from "./rate";

export class RateRecord {
  @AutoMap()
  public created_at: string;

  @AutoMap()
  public id: string;

  @AutoMap()
  public updated_at: string;

  @AutoMap(() => String)
  public status: ECalculateDeliveryRateStatus;

  @AutoMap(() => [Rate])
  public rates: Rate[];
}
