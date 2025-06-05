import { AutoMap } from "@automapper/classes";
import { EUnitWeight } from "../../../../types";

export class Weight {
  @AutoMap(() => String)
  public unit: EUnitWeight;

  @AutoMap()
  public value: number;
}
