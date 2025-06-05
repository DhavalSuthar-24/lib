import { AutoMap } from "@automapper/classes";
import { ECardCategory, ECardStatus, ECardType, ETokenStatus } from "../enums";
import { CardExpiry } from "./card-expiry";
import { ECountryCodeIso2 } from "../../../types";

export class PaysafeCard {
  @AutoMap()
  public id?: string;

  @AutoMap()
  public cardNum?: string;

  @AutoMap(() => CardExpiry)
  public cardExpiry: CardExpiry;

  @AutoMap()
  public cvv?: string;

  @AutoMap()
  public holderName?: string;

  @AutoMap(() => String)
  public cardType?: ECardType;

  // same like cardType (some transactions return 'type' or some 'cardType')
  @AutoMap(() => String)
  public type?: ECardType;

  @AutoMap()
  public lastDigits?: string;

  @AutoMap()
  public nickName?: string;

  @AutoMap()
  public cardBin?: string;

  @AutoMap(() => String)
  public issuingCountry?: ECountryCodeIso2;

  @AutoMap(() => String)
  public status?: ECardStatus;

  @AutoMap(() => String)
  public cardCategory?: ECardCategory;

  @AutoMap()
  public paymentToken?: string;

  @AutoMap(() => String)
  public storedCredentialTokenStatus?: ETokenStatus;

  @AutoMap()
  public billingAddressId?: string;
}
