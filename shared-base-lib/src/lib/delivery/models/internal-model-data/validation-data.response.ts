import { AutoMap } from "@automapper/classes";
import { EDeliveryValidationStatus } from "../../domain";
import { AddressAfterShipModel } from "../internal-model-data";

export class ValidationDataResponse {
  @AutoMap()
  public id: string;

  @AutoMap(() => String)
  public status: EDeliveryValidationStatus;

  @AutoMap()
  public created_at: string;

  @AutoMap()
  public updated_at: string;

  @AutoMap(() => AddressAfterShipModel)
  public address: AddressAfterShipModel;

  @AutoMap(() => AddressAfterShipModel)
  public recommended_address: AddressAfterShipModel;
}
