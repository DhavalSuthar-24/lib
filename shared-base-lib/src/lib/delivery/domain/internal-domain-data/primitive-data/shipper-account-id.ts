import { AutoMap } from "@automapper/classes";

export class ShipperAccountId {
  @AutoMap()
  public id: string;

  constructor(id: string) {
    this.id = id;
  }
}
