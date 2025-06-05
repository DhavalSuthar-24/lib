import { AutoMap } from "@automapper/classes";
import { EChargeType } from "../../../types";
import { Money } from "../../domain";

export class AdditionalCharge {
  @AutoMap(() => String)
  public type: EChargeType;

  @AutoMap(() => Money)
  public charge: Money;
}
