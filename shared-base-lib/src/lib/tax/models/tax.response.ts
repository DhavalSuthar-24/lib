import { AutoMap } from "@automapper/classes";
import { Tax } from "./internal-data";

export class TaxResponse {
  @AutoMap(() => Tax)
  public tax: Tax;
}
