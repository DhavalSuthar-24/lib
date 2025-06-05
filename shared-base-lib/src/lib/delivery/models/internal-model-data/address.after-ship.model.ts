import { AutoMap } from "@automapper/classes";
import { ECountryCodeIso3 } from "../../../types";
import { Coordinates } from "../../domain";

export class AddressAfterShipModel {
  @AutoMap()
  public street1: string;

  @AutoMap(() => String)
  public country: ECountryCodeIso3;

  @AutoMap()
  public contact_name: string;

  @AutoMap()
  public phone: string;

  @AutoMap()
  public fax: string;

  @AutoMap()
  public email: string;

  @AutoMap()
  public company_name: string;

  @AutoMap()
  public street2: string;

  @AutoMap()
  public street3: string;

  @AutoMap()
  public city: string;

  @AutoMap()
  public state: string;

  @AutoMap()
  public postal_code: string;

  @AutoMap()
  public type: string;

  @AutoMap()
  public tax_id: string;

  @AutoMap()
  public eori_number: string;

  @AutoMap(() => Coordinates)
  public location: Coordinates;
}
