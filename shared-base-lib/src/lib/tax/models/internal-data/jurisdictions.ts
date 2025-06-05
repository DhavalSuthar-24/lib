import { AutoMap } from "@automapper/classes";

export class Jurisdictions {
  @AutoMap()
  public country: string;

  @AutoMap()
  public state: string;

  @AutoMap()
  public county: string;

  @AutoMap()
  public city: string;
}
