import { AutoMap } from "@automapper/classes";
import { AddressAfterShipModel } from "./internal-model-data";

export class AddressValidationAfterShipRequest {
  @AutoMap(() => AddressAfterShipModel)
  public address: AddressAfterShipModel;

  constructor(address: AddressAfterShipModel) {
    this.address = address;
  }
}
