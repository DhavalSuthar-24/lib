import { AutoMap } from "@automapper/classes";

export class Coordinates {
  @AutoMap()
  public lat: number;

  @AutoMap()
  public lng: number;
}
