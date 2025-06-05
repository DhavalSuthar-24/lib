import { AutoMap } from "@automapper/classes";
import { ECountryCodeIso2 } from "../../types";

export class AddressData {
  @AutoMap()
  public id?: string;

  @AutoMap()
  public profileId: string;

  @AutoMap()
  public nickName?: string;

  @AutoMap()
  public street?: string;

  @AutoMap()
  public city: string;

  @AutoMap()
  public zip: string;

  @AutoMap(() => String)
  public country: ECountryCodeIso2;

  @AutoMap()
  public phone: string;

  @AutoMap()
  public defaultShippingAddressIndicator: boolean;
}
