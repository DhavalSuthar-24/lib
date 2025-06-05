import { AutoMap } from "@automapper/classes";

export class PaymentTokenWithCvv {
  @AutoMap()
  public paymentToken: string;

  @AutoMap()
  public cvv: string;
}
