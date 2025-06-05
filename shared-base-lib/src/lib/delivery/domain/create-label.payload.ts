import { AutoMap } from "@automapper/classes";
import { Dimension, Money, Weight } from "./internal-domain-data";
import { Address } from "../../types";

export class CreateLabelPayload {
  @AutoMap()
  public serviceType: string;

  @AutoMap()
  public shipperAccountId: string;

  @AutoMap(() => Address)
  public shipFrom: Address;

  @AutoMap(() => Address)
  public shipTo: Address;

  @AutoMap(() => Weight)
  public weight: Weight;

  @AutoMap(() => Dimension)
  public dimension: Dimension;

  @AutoMap()
  public assetName: string;

  @AutoMap(() => Money)
  public price: Money;

  @AutoMap()
  public quantity?: number;

  @AutoMap()
  public paperSize?: string;

  @AutoMap()
  public deliveryInstructions?: string;

  @AutoMap()
  public orderId?: string;
}
