import { AutoMap } from "@automapper/classes";
import { ECurrencyCode, EPaymentType, ETransactionType } from "./enums";
import { BillingDetails, Paypal, PaysafeCard, ReturnLink, Venmo } from "./internal-data";

export class PaymentHandleRequest {
  @AutoMap()
  public merchantRefNum: string;

  @AutoMap(() => String)
  public transactionType: ETransactionType;

  @AutoMap()
  public accountId: string;

  @AutoMap(() => String)
  public paymentType: EPaymentType;

  @AutoMap()
  public amount: number;

  @AutoMap(() => String)
  public currencyCode: ECurrencyCode;

  @AutoMap(() => BillingDetails)
  public billingDetails?: BillingDetails;

  @AutoMap(() => PaysafeCard)
  public card?: PaysafeCard;

  @AutoMap(() => [ReturnLink])
  public returnLinks: ReturnLink[];

  @AutoMap(() => Paypal)
  public paypal?: Paypal;

  @AutoMap(() => Venmo)
  public venmo?: Venmo;
}
