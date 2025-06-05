import { AutoMap } from "@automapper/classes";

export class LineItemResponse {
  @AutoMap()
  public id: string;

  @AutoMap()
  public taxable_amount: number;

  @AutoMap()
  public tax_collectable: number;

  @AutoMap()
  public combined_tax_rate: number;

  @AutoMap()
  public state_taxable_amount: number;

  @AutoMap()
  public state_sales_tax_rate: number;

  @AutoMap()
  public state_amount: number;

  @AutoMap()
  public county_taxable_amount: number;

  @AutoMap()
  public county_tax_rate: number;

  @AutoMap()
  public county_amount: number;

  @AutoMap()
  public city_taxable_amount: number;

  @AutoMap()
  public city_tax_rate: number;

  @AutoMap()
  public city_amount: number;

  @AutoMap()
  public special_district_taxable_amount: number;

  @AutoMap()
  public special_tax_rate: number;

  @AutoMap()
  public special_district_amount: number;
}
