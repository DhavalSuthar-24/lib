import { AutoMap } from "@automapper/classes";

export class TaxCategory {
  @AutoMap()
  public taxCode: string;

  @AutoMap()
  public name: string;

  @AutoMap()
  public description: string;
}
