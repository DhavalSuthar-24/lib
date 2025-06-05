import { AutoMap } from "@automapper/classes";

export class VoidResponse {
  @AutoMap()
  public successful: boolean;

  @AutoMap()
  public message: string;
}
