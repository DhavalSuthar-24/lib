import { AutoMap } from "@automapper/classes";
import { EMPTY_STR, isNilOrEmpty } from "@bit-core-api/shared-utils-lib";
import { EAddressType, ECountryCodeIso2 } from "../";

export class Address {
  @AutoMap()
  public id: string;

  @AutoMap(() => String)
  public type: EAddressType;

  @AutoMap()
  public name: string;

  @AutoMap()
  public address: string;

  @AutoMap()
  public addressLine1: string;

  @AutoMap()
  public addressLine2: string;

  @AutoMap()
  public city: string;

  @AutoMap()
  public state: string;

  @AutoMap()
  public stateCode: string;

  @AutoMap()
  public zip: string;

  @AutoMap()
  public country: string;

  @AutoMap()
  public phone: string;

  @AutoMap()
  public isMain: boolean;

  @AutoMap()
  public isAddressMatched: boolean;

  @AutoMap(() => String)
  public countryCode: ECountryCodeIso2;

  @AutoMap()
  public latitude?: number;

  @AutoMap()
  public longitude?: number;

  public get fullAddress(): string {
    const addr = `${this?.addressLine1 ?? EMPTY_STR} ${this?.city ?? EMPTY_STR} ${this?.state ?? EMPTY_STR} ${this?.country ?? EMPTY_STR}`.trim();
    return isNilOrEmpty(addr) ? null : addr;
  }
}
