import { AutoMap } from "@automapper/classes";

export class Error {
  @AutoMap()
  public path: string;

  @AutoMap()
  public info: string;
}
