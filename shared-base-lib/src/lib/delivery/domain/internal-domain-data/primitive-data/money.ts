import { AutoMap } from "@automapper/classes";
import { ECurrencyCode } from "../../../../payment";

export class Money {
  @AutoMap()
  public amount: number;

  @AutoMap(() => String)
  public currency: ECurrencyCode;

  constructor(amount?: number, currency?: ECurrencyCode) {
    this.amount = amount;
    this.currency = currency;
  }
}
