import { AutoMap } from "@automapper/classes";
import { AddressAfterShipModel } from "./address.after-ship.model";
import { Parcel } from "./parcel";

export class Shipment {
  @AutoMap(() => AddressAfterShipModel)
  public ship_from: AddressAfterShipModel;

  @AutoMap(() => AddressAfterShipModel)
  public ship_to: AddressAfterShipModel;

  @AutoMap(() => [Parcel])
  public parcels: Parcel[];

  @AutoMap(() => AddressAfterShipModel)
  public return_to?: AddressAfterShipModel;

  @AutoMap()
  public delivery_instructions?: string;
}
