import { AutoMap } from "@automapper/classes";

export class LineItem {
  @AutoMap()
  public id?: string;

  @AutoMap()
  public quantity?: number;

  @AutoMap()
  public product_identifier?: string;

  @AutoMap()
  public description?: string;

  @AutoMap()
  public product_tax_code?: string;

  @AutoMap()
  public unit_price?: number;

  @AutoMap()
  public discount?: number;

  @AutoMap()
  public sales_tax?: number;
}
