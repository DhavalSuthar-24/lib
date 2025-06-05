import { AutoMap } from "@automapper/classes";
import { ECountryCodeIso3 } from "../../../../types";

export class PaymentMethodAccount {
  @AutoMap()
  public type: string;

  @AutoMap()
  public account_number: string;

  @AutoMap()
  public postal_code: string;

  @AutoMap(() => String)
  public country: ECountryCodeIso3;
}
