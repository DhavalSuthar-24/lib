import { AutoMap } from "@automapper/classes";
import { RiskManagementResult } from "./index";

export class DisbursementTransactionResponse {
  @AutoMap()
  public authorizationId: string;

  @AutoMap()
  public status: number;

  @AutoMap()
  public returnCode?: string;

  @AutoMap()
  public routing: string;

  @AutoMap()
  public accountNumber: string;

  @AutoMap()
  public amount: number;

  @AutoMap()
  public firstName: string;

  @AutoMap()
  public lastName: string;

  @AutoMap(() => RiskManagementResult)
  public riskManagementResult?: RiskManagementResult;

  @AutoMap()
  public tranCode: string;

  @AutoMap()
  public uniqueTranId: string;
}
