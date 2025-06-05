import { Meta, ValidationDataResponse } from "./internal-model-data";
import { AutoMap } from "@automapper/classes";

export class AddressValidationAfterShipResponse {
  @AutoMap()
  public meta: Meta;

  @AutoMap(() => ValidationDataResponse)
  public data: ValidationDataResponse;
}
