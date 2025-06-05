import { AutoMap } from "@automapper/classes";
import { TransactionResponse } from "./transaction.response";
import { Paypal, Venmo } from "./internal-data";

export class StandaloneCreditResponse extends TransactionResponse {
  @AutoMap(() => Paypal)
  public paypal?: Paypal;

  @AutoMap(() => Venmo)
  public venmo?: Venmo;
}
