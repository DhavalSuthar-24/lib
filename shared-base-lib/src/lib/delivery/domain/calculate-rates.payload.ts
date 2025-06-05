import { AutoMap } from "@automapper/classes";
import { Dimension, Weight } from "./internal-domain-data";
import { Address } from "../../types";

export class CalculateRatesPayload {
  @AutoMap(() => Address)
  public shipFrom: Address;

  @AutoMap(() => Address)
  public shipTo: Address;

  @AutoMap(() => Weight)
  public weight: Weight;

  @AutoMap(() => Dimension)
  public dimension: Dimension;

  constructor(shipFrom: Address, shipTo: Address, weight: Weight, dimension: Dimension) {
    this.shipFrom = shipFrom;
    this.shipTo = shipTo;
    this.weight = weight;
    this.dimension = dimension;
  }
}
