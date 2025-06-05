import { AutoMap } from "@automapper/classes";
import {
  BillingDetails,
  EAddressVerificationSystem,
  ECurrencyCode,
  ECvvVerification,
  ETransactionStatus,
  Link,
  MerchantDescriptor,
  PaysafeCard,
  GatewayProfile,
  Settlement,
} from ".";

export class AuthorizationResponse {
  @AutoMap()
  public id: string;

  @AutoMap()
  public merchantRefNum: string;

  @AutoMap(() => Date)
  public txnTime: Date;

  @AutoMap(() => String)
  public status: ETransactionStatus;

  @AutoMap()
  public amount: number;

  @AutoMap()
  public settleWithAuth: boolean;

  @AutoMap()
  public preAuth: boolean;

  @AutoMap()
  public availableToSettle: number;

  @AutoMap(() => PaysafeCard)
  public card: PaysafeCard;

  @AutoMap()
  public authCode: string;

  @AutoMap(() => GatewayProfile)
  public profile: GatewayProfile;

  @AutoMap(() => BillingDetails)
  public billingDetails: BillingDetails;

  @AutoMap(() => MerchantDescriptor)
  public merchantDescriptor: MerchantDescriptor;

  @AutoMap(() => Object)
  public visaAdditionalAuthData: unknown;

  @AutoMap(() => String)
  public currencyCode: ECurrencyCode;

  @AutoMap(() => String)
  public avsResponse: EAddressVerificationSystem;

  @AutoMap(() => String)
  public cvvVerification: ECvvVerification;

  @AutoMap(() => [Settlement])
  public settlements?: Settlement[];

  @AutoMap(() => [Link])
  public links: Link[];
}
