import { AutoMap } from "@automapper/classes";
import { EPaymentType, ESettlementTransactionStatus } from "./enums";

export class SettlementResponse {
  @AutoMap()
  public id: string;

  @AutoMap(() => Date)
  public txnTime: Date;

  @AutoMap(() => String)
  public status: ESettlementTransactionStatus;

  @AutoMap()
  public merchantRefNum: string;

  @AutoMap()
  public amount: number;

  @AutoMap()
  public availableToRefund: number;

  @AutoMap(() => String)
  public paymentType?: EPaymentType;
}
