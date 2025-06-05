import { AutoMap } from "@automapper/classes";
import { ECurrencyCode, EPaymentType, ETransactionStatus } from "./enums";
import { BillingDetails, GatewayResponse, MerchantDescriptor, PaysafeCard } from "./internal-data";

export class TransactionResponse {
  @AutoMap()
  public id: string;

  @AutoMap(() => String)
  public paymentType: EPaymentType;

  @AutoMap()
  public paymentHandleToken: string;

  @AutoMap()
  public merchantRefNum: string;

  @AutoMap(() => String)
  public currencyCode: ECurrencyCode;

  @AutoMap()
  public settleWithAuth: boolean;

  @AutoMap(() => Date)
  public txnTime: Date;

  @AutoMap(() => BillingDetails)
  public billingDetails: BillingDetails;

  @AutoMap()
  public customerIp: string;

  @AutoMap(() => String)
  public status: ETransactionStatus;

  @AutoMap()
  public amount: number;

  @AutoMap()
  public preAuth: boolean;

  @AutoMap()
  public availableToSettle: number;

  @AutoMap(() => GatewayResponse)
  public gatewayResponse?: GatewayResponse;

  @AutoMap(() => MerchantDescriptor)
  public merchantDescriptor?: MerchantDescriptor;

  @AutoMap(() => PaysafeCard)
  public card?: PaysafeCard;
}
