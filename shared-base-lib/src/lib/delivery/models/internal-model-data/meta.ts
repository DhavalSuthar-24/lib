import { AutoMap } from "@automapper/classes";
import { EDeliveryErrorType, Error } from "../../domain";

export class Meta {
  @AutoMap()
  public code: number;

  @AutoMap(() => String)
  public type: EDeliveryErrorType;

  @AutoMap()
  public message: string;

  @AutoMap(() => [Error])
  public details: Error[];
}
