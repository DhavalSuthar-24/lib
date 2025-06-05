import { AutoMap } from "@automapper/classes";
import { DisbursementTransactionResponse } from "./internal-domain-data";

export class RetrieveResponse {
  @AutoMap(() => DisbursementTransactionResponse)
  public transaction: DisbursementTransactionResponse;

  @AutoMap()
  public successful: boolean;

  @AutoMap()
  public message?: string;
}
