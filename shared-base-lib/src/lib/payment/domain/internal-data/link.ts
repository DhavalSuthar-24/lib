import { AutoMap } from "@automapper/classes";

export class Link {
  @AutoMap()
  public rel: string;

  @AutoMap()
  public href: string;
}
