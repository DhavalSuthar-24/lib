import { AutoMap } from "@automapper/classes";
import { ETransactionStatus } from "../enums";
import { Link } from "./link";

export class Settlement {
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
  public availableToRefund: number;

  @AutoMap(() => [Link])
  public links: Link[];
}
