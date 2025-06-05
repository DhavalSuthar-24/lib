import { AutoMap } from "@automapper/classes";

export class RiskManagementResult {
  @AutoMap()
  public typeId: string;

  @AutoMap()
  public description: string;
}
