import { AutoMap } from "@automapper/classes";
import { ELocale } from "../enums";

export class GatewayProfile {
  @AutoMap()
  public id?: string;

  @AutoMap()
  public status?: string;

  @AutoMap()
  public merchantCustomerId?: string;

  @AutoMap(() => String)
  public locale?: ELocale;

  @AutoMap()
  public email?: string;

  @AutoMap()
  public firstName?: string;

  @AutoMap()
  public lastName?: string;

  @AutoMap()
  public phone?: string;

  @AutoMap()
  public emailverified?: string;

  @AutoMap()
  public phoneVerified?: string;

  @AutoMap()
  public mobile?: string;

  @AutoMap()
  public cellphone?: string;
}
