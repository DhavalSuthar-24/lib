import { AutoMap } from "@automapper/classes";

export class SalesTax {
  @AutoMap()
  public amountToCollect: number;

  @AutoMap()
  public orderTotalAmount: number;

  @AutoMap()
  public rate: number;

  @AutoMap()
  public shipping: number;

  @AutoMap()
  public taxSource: string;

  @AutoMap()
  public taxableAmount: number;

  @AutoMap()
  public freightTaxable: boolean;

  @AutoMap()
  public hasNexus: boolean;
}
