import { AutoMap } from "@automapper/classes";

export class Passport {
  @AutoMap()
  public number: string;

  @AutoMap()
  public issue_date: string;
}
