import { AutoMap } from "@automapper/classes";
import { EPaymentHandleTransactionStatus, EPaymentHandleUsage, EPaymentType } from "../enums";
import { PaysafeCard } from "./paysafe-card";

export class SingleUsePaymentHandle {
  @AutoMap()
  public id: string;

  @AutoMap(() => String)
  public status: EPaymentHandleTransactionStatus;

  @AutoMap(() => String)
  public usage: EPaymentHandleUsage;

  @AutoMap(() => String)
  public paymentType: EPaymentType;

  @AutoMap()
  public paymentHandleToken: string;

  @AutoMap(() => PaysafeCard)
  public card: PaysafeCard;

  @AutoMap()
  public billingDetailsId: string;
}
