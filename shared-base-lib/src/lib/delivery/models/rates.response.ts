import { AutoMap } from "@automapper/classes";
import { Meta, RateRecord } from "./internal-model-data";

export class RatesResponse {
  @AutoMap(() => Meta)
  public meta: Meta;

  @AutoMap(() => RateRecord)
  public data: RateRecord;
}
