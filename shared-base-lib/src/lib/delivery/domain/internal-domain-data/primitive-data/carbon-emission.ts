import { AutoMap } from "@automapper/classes";

export class CarbonEmission {
  @AutoMap()
  public unit: string;

  @AutoMap()
  public value: number;
}
