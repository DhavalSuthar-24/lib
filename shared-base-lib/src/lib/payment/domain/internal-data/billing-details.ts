import { AutoMap } from "@automapper/classes";
import { ECountryCodeIso2 } from "../../../types";

export class BillingDetails {
  @AutoMap()
  public nickName?: string;

  @AutoMap()
  public street?: string;

  @AutoMap()
  public city?: string;

  @AutoMap()
  public state?: string;

  @AutoMap(() => String)
  public country: ECountryCodeIso2;

  @AutoMap()
  public zip: string;

  @AutoMap()
  public address1?: string;

  @AutoMap()
  public address2?: string;

  @AutoMap()
  public address3?: string;

  @AutoMap()
  public administrativeArea?: string;

  @AutoMap()
  public countryCode?: string;

  @AutoMap()
  public locality?: string;

  @AutoMap()
  public name?: string;

  @AutoMap()
  public postalCode?: number;

  @AutoMap()
  public sortingCode?: number;
}
