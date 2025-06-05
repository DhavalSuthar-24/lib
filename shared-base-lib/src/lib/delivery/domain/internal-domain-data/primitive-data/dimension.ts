import { AutoMap } from "@automapper/classes";
import { EUnitDimension } from "../../../../types";

export class Dimension {
  @AutoMap()
  public width: number;

  @AutoMap()
  public height: number;

  @AutoMap()
  public depth: number;

  @AutoMap(() => String)
  public unit: EUnitDimension;
}
