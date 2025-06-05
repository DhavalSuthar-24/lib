import { AutoMap } from "@automapper/classes";
import { EDeliveryPaidBy, PaymentMethodAccount } from "../../domain";

export class Billing {
  @AutoMap(() => String)
  public paid_by: EDeliveryPaidBy;

  @AutoMap(() => PaymentMethodAccount)
  public method: PaymentMethodAccount;
}
