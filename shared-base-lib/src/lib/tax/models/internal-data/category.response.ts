import { AutoMap } from "@automapper/classes";

export class CategoryResponse {
  @AutoMap()
  public product_tax_code: string;

  @AutoMap()
  public name: string;

  @AutoMap()
  public description: string;
}
