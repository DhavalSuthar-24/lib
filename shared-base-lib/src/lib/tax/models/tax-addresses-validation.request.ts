import { AutoMap } from "@automapper/classes";
import { ECountryCodeIso2, EStateCodeIso2 } from "../../types";

export class TaxAddressesValidationRequest {
  @AutoMap(() => String)
  public country: ECountryCodeIso2;

  @AutoMap()
  public zip: string;

  @AutoMap(() => String)
  public state: EStateCodeIso2;

  @AutoMap()
  public city: string;

  @AutoMap()
  public street: string;
}
