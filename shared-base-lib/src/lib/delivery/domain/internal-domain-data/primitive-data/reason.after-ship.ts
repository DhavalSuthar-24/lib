import { AutoMap } from "@automapper/classes";
import { EReasonCodeAS } from "../../enums";

export class ReasonAfterShip {
  @AutoMap(() => String)
  public code: EReasonCodeAS;
}
