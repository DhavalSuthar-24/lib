import { AutoMap } from "@automapper/classes";

export class NexusAddress {
  @AutoMap()
  public id?: string;

  @AutoMap()
  public country?: string;

  @AutoMap()
  public zip?: string;

  @AutoMap()
  public state?: string;

  @AutoMap()
  public city?: string;

  @AutoMap()
  public street?: string;
}
