import { AutoMap } from "@automapper/classes";
import { ELocale, EProfileStatus } from "./enums";

export class Profile {
  @AutoMap()
  public id?: string;

  @AutoMap(() => String)
  public status?: EProfileStatus;

  @AutoMap(() => String)
  public locale?: ELocale;

  @AutoMap()
  public merchantCustomerId: string;

  @AutoMap()
  public paymentToken?: string;
}
