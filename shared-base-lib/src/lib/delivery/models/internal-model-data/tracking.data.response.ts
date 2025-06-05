import { AutoMap } from "@automapper/classes";
import { TrackingAfterShipDataResponse } from "./tracking.after-ship.data.response";

export class TrackingDataResponse {
  @AutoMap(() => TrackingAfterShipDataResponse)
  public tracking: TrackingAfterShipDataResponse;
}
