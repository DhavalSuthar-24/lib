import { AutoMap } from "@automapper/classes";
import { Money } from "../../domain";

export class DetailedCharge {
  @AutoMap()
  public type: string;

  @AutoMap(() => Money)
  public charge: Money;
}
