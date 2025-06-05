import { AutoMap } from "@automapper/classes";
import { EShipperAccount } from "../../../domain";

export class NextCourierData {
  @AutoMap()
  public slug: EShipperAccount;

  @AutoMap()
  public tracking_number: string;

  @AutoMap()
  public source?: string;
}
