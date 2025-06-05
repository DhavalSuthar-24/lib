import { AutoMap } from "@automapper/classes";
import { ReasonAfterShip } from "./primitive-data";

export class EventAfterShip {
  @AutoMap()
  public code: string;

  @AutoMap(() => ReasonAfterShip)
  public reason: ReasonAfterShip;
}
