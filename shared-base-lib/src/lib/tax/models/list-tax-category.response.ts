import { AutoMap } from "@automapper/classes";
import { CategoryResponse } from "./internal-data";

export class ListTaxCategoryResponse {
  @AutoMap(() => [CategoryResponse])
  public categories: CategoryResponse[];
}
