import { AutoMap } from "@automapper/classes";
import { Dimension, Weight } from "../../domain";
import { Item } from "./item";

export class Parcel {
  @AutoMap(() => Weight)
  public weight: Weight;

  @AutoMap(() => Dimension)
  public dimension: Dimension;

  @AutoMap(() => [Item])
  public items: Item[];

  @AutoMap()
  public box_type: string;

  @AutoMap()
  public description?: string;

  constructor(weight: Weight, dimension: Dimension, items: Item[], box_type: string, description?: string) {
    this.weight = weight;
    this.dimension = dimension;
    this.items = items;
    this.box_type = box_type;
    this.description = description;
  }
}
