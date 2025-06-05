import { AutoMap } from "@automapper/classes";

export class TaxItem {
  @AutoMap()
  public id?: string;

  @AutoMap()
  public quantity?: number;

  @AutoMap()
  public productIdentifier?: string;

  @AutoMap()
  public description?: string;

  @AutoMap()
  public productTaxCode?: string;

  @AutoMap()
  public unitPrice?: number;

  @AutoMap()
  public discount?: number;

  @AutoMap()
  public salesTax?: number;

  constructor(unitPrice?: number, productTaxCode?: string, quantity = 1, salesTax?: number) {
    this.unitPrice = unitPrice;
    this.quantity = quantity;
    this.productTaxCode = productTaxCode;
    this.salesTax = salesTax;
  }
}
