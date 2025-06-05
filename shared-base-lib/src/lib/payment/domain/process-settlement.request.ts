import { AutoMap } from "@automapper/classes";

export class ProcessSettlementRequest {
  @AutoMap()
  public merchantRefNum: string;

  @AutoMap()
  public amount: number;

  @AutoMap()
  public dupCheck?: boolean;

  constructor(merchantRefNum: string, amount: number, dupCheck = true) {
    this.merchantRefNum = merchantRefNum;
    this.amount = amount;
    this.dupCheck = dupCheck;
  }
}
