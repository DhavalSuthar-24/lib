import { AutoMap } from "@automapper/classes";
import { EBankAccountType, ESecCode, EWebType } from "./enums";

export class DebitCreditRequest {
  @AutoMap()
  public uniqueTranId: string; // using orderId from order_snapshots table, maybe it should be changed

  @AutoMap()
  public routing: string;

  @AutoMap()
  public accountNumber: string;

  @AutoMap()
  public checkNumber?: string;

  @AutoMap()
  public checkAmount: string;

  @AutoMap(() => String)
  public secCode: ESecCode;

  @AutoMap(() => String)
  public accountType: EBankAccountType;

  @AutoMap()
  public lastName?: string;

  @AutoMap()
  public firstName?: string;

  @AutoMap()
  public companyName?: string;

  @AutoMap()
  public address1?: string;

  @AutoMap()
  public address2?: string;

  @AutoMap()
  public city?: string;

  @AutoMap()
  public state?: string;

  @AutoMap()
  public zip?: string;

  @AutoMap()
  public phone?: string;

  @AutoMap()
  public checkDate?: string;

  @AutoMap()
  public opt1?: string;

  @AutoMap()
  public opt2?: string;

  @AutoMap()
  public opt3?: string;

  @AutoMap()
  public opt4?: string;

  @AutoMap()
  public opt5?: string;

  @AutoMap()
  public opt6?: string;

  @AutoMap()
  public originalTranId?: string;

  @AutoMap()
  public micrData?: string;

  @AutoMap(() => String)
  public webType?: EWebType;

  @AutoMap()
  public origSecCode?: string;

  @AutoMap()
  public imageF?: string;

  @AutoMap()
  public imageB?: string;

  @AutoMap()
  public customDescriptor?: string;

  @AutoMap()
  public isSameDay?: boolean;

  @AutoMap()
  public futureDate?: string;

  @AutoMap()
  public microEntry?: boolean;
}
