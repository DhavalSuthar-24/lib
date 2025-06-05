import { AutoMap } from "@automapper/classes";
import { TransactionResponse } from "./transaction.response";
import { MetaResponse } from "./internal-data";

export class ListTransactionsResponse {
  @AutoMap(() => MetaResponse)
  public meta: MetaResponse;

  @AutoMap(() => [TransactionResponse])
  public payments: TransactionResponse[];
}
