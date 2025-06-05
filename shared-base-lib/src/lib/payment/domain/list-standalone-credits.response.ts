import { AutoMap } from "@automapper/classes";
import { MetaResponse } from "./internal-data";
import { StandaloneCreditResponse } from "./standalone-credit.response";

export class ListStandaloneCreditsResponse {
  @AutoMap(() => MetaResponse)
  public meta: MetaResponse;

  @AutoMap(() => [StandaloneCreditResponse])
  public standaloneCredits: StandaloneCreditResponse[];
}
