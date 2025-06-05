import { AutoMap } from "@automapper/classes";
import { NexusAddress } from "./internal-data";

export class TaxAddressesValidationResponse {
  @AutoMap(() => [NexusAddress])
  public addresses: NexusAddress[];
}
