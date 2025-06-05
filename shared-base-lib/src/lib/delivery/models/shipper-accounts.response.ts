import { AutoMap } from "@automapper/classes";
import { Data, Meta } from "./internal-model-data";

export class ShipperAccountsResponse {
  @AutoMap(() => Data)
  public data: Data;

  @AutoMap(() => Meta)
  public meta: Meta;
}
