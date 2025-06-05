import { AutoMap } from "@automapper/classes";

export class CardExpiry {
  @AutoMap()
  public month: number;

  @AutoMap()
  public year: number;
}
