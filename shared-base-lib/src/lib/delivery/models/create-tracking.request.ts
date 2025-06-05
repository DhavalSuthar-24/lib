import { AutoMap } from "@automapper/classes";
import { TrackingAfterShipDataRequest } from "./internal-model-data";

export class CreateTrackingRequest {
  @AutoMap(() => TrackingAfterShipDataRequest)
  public tracking: Partial<TrackingAfterShipDataRequest>;

  constructor(tracking: Partial<TrackingAfterShipDataRequest>) {
    this.tracking = tracking;
  }
}
