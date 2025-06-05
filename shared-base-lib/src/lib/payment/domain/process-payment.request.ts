import { AutoMap } from "@automapper/classes";
import { ECurrencyCode } from "./enums";
import { PaymentRequest } from "./payment.request";

export class ProcessPaymentRequest extends PaymentRequest {
  @AutoMap(() => String)
  public currencyCode: ECurrencyCode;

  @AutoMap()
  public paymentHandleToken: string;

  constructor(merchantRefNum: string, amount: number, currencyCode: ECurrencyCode, paymentHandleToken: string, settleWithAuth = false, dupCheck = true) {
    super();
    this.merchantRefNum = merchantRefNum;
    this.amount = amount;
    this.currencyCode = currencyCode;
    this.paymentHandleToken = paymentHandleToken;
    this.settleWithAuth = settleWithAuth;
    this.dupCheck = dupCheck;
  }
}
