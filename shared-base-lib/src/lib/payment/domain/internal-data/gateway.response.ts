import { AutoMap } from "@automapper/classes";
import { EAddressVerificationSystem, ECvvVerification, ENameVerification } from "../enums";
import { GatewayProfile } from "./gateway-profile";

export class GatewayResponse {
  @AutoMap()
  public authCode: string;

  @AutoMap(() => String)
  public avsResponse: EAddressVerificationSystem;

  @AutoMap(() => String)
  public cvvVerification: ECvvVerification;

  @AutoMap()
  public serializable: boolean;

  @AutoMap()
  public brainTreeCustomerId?: string;

  @AutoMap()
  public userName?: string;

  @AutoMap(() => GatewayProfile)
  public profile?: GatewayProfile;

  @AutoMap()
  public operationId?: string;

  @AutoMap()
  public processor?: string;

  @AutoMap()
  public code?: string;

  @AutoMap()
  public responseCode?: string;

  @AutoMap()
  public avsCode?: string;

  @AutoMap(() => String)
  public nameVerification?: ENameVerification;

  @AutoMap()
  public balanceResponse?: string;

  @AutoMap()
  public mid?: string;

  @AutoMap()
  public terminalId?: string;

  @AutoMap()
  public batchNumber?: string;

  @AutoMap()
  public seqNumber?: string;

  @AutoMap()
  public effectiveDate?: string;

  @AutoMap()
  public financingType?: string;

  @AutoMap()
  public plan?: string;

  @AutoMap()
  public gracePeriod?: string;

  @AutoMap()
  public term?: string;

  @AutoMap()
  public responseId?: string;

  @AutoMap()
  public requestId?: string;

  @AutoMap()
  public description?: string;

  @AutoMap()
  public txnDateTime?: string;

  @AutoMap()
  public referenceNbr?: string;

  @AutoMap()
  public responseReasonCode?: string;

  @AutoMap()
  public cvv2Result?: string;

  @AutoMap()
  public status?: string;

  @AutoMap()
  public orderId?: string;

  @AutoMap()
  public id?: string;

  @AutoMap()
  public payerId?: string;

  @AutoMap()
  public payPalSaleId?: string;

  @AutoMap()
  public payPalInvoiceId?: string;
}
