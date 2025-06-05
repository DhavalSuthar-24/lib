import { AutoMap } from "@automapper/classes";

export abstract class PaymentRequest {
  @AutoMap()
  public merchantRefNum: string;

  @AutoMap()
  public amount: number;

  @AutoMap()
  public dupCheck?: boolean;

  @AutoMap()
  public settleWithAuth?: boolean;
}
