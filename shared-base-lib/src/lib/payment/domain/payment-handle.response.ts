import { AutoMap } from "@automapper/classes";
import { PaymentHandleRequest } from "./payment-handle.request";
import { EExecutionMode, EPaymentHandleTransactionStatus, EPaymentHandleUsage } from "./enums";
import { ApplePay, GatewayResponse, GooglePay, Link } from "./internal-data";

export class PaymentHandleResponse extends PaymentHandleRequest {
  @AutoMap()
  public id: string;

  @AutoMap(() => String)
  public status: EPaymentHandleTransactionStatus;

  @AutoMap()
  public paymentHandleToken: string;

  @AutoMap()
  public txnTime: string;

  @AutoMap()
  public customerIp?: string;

  @AutoMap(() => [Link])
  public links?: Link[];

  @AutoMap()
  public liveMode: boolean;

  @AutoMap()
  public statusTime: string;

  @AutoMap()
  public updatedTime: string;

  @AutoMap()
  public gatewayReconciliationId: string;

  @AutoMap(() => String)
  public usage: EPaymentHandleUsage;

  @AutoMap(() => String)
  public executionMode: EExecutionMode;

  @AutoMap(() => GatewayResponse)
  public gatewayResponse: GatewayResponse;

  @AutoMap(() => ApplePay)
  public applePay?: ApplePay;

  @AutoMap(() => GooglePay)
  public googlePay?: GooglePay;
}
