import { AutoMap } from "@automapper/classes";
import { Meta, TrackingDataResponse } from "./internal-model-data";

export class TrackingResponse {
  @AutoMap(() => Meta)
  public meta: Meta;

  @AutoMap(() => TrackingDataResponse)
  public data: TrackingDataResponse;
}
