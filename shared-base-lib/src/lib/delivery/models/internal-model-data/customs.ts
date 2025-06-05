import { AutoMap } from "@automapper/classes";
import { EDeliveryTermsOfTrade, EDeliveryPurpose, Passport } from "../../domain";
import { Billing } from "./billing";
import { AddressAfterShipModel } from "./address.after-ship.model";
import { AdditionalCharge } from "./additional-charge";

export class Customs {
  @AutoMap(() => String)
  public purpose: EDeliveryPurpose;

  @AutoMap()
  public terms_of_trade: EDeliveryTermsOfTrade;

  @AutoMap(() => Billing)
  public billing: Billing;

  @AutoMap(() => AddressAfterShipModel)
  public importer_address: AddressAfterShipModel;

  @AutoMap(() => Passport)
  public passport: Passport;

  @AutoMap(() => [AdditionalCharge])
  public additional_charges: AdditionalCharge[];
}
