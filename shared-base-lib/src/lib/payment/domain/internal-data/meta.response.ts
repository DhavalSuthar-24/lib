import { AutoMap } from "@automapper/classes";

export class MetaResponse {
  @AutoMap()
  public numberOfRecords: number;

  @AutoMap()
  public limit: number;

  @AutoMap()
  public page: number;
}
