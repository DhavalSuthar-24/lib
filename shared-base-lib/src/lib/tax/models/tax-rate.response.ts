import { AutoMap } from "@automapper/classes";
import { RateResponse } from "./internal-data";

export class TaxRateResponse {
  @AutoMap(() => RateResponse)
  public rate: RateResponse;
}
