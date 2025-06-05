import { AutoMap } from "@automapper/classes";
import { MetaResponse } from "./internal-data";
import { SettlementResponse } from "./settlement.response";

export class ListSettlementsResponse {
  @AutoMap(() => MetaResponse)
  public meta: MetaResponse;

  @AutoMap(() => [SettlementResponse])
  public settlements: SettlementResponse[];
}
