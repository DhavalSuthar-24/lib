import { AutoMap } from "@automapper/classes";
import { Weight, Money } from "../../domain";

export class Item {
  @AutoMap()
  public description: string;

  @AutoMap()
  public quantity: number;

  @AutoMap()
  public description_cn: string;

  @AutoMap(() => Money)
  public price: Money;

  @AutoMap()
  public item_id: string;

  @AutoMap()
  public origin_country: string;

  @AutoMap(() => Weight)
  public weight: Weight;

  @AutoMap()
  public sku: string;

  @AutoMap()
  public hs_code: string;

  @AutoMap()
  public return_reason: string;

  constructor(
    description: string,
    price?: Money,
    quantity = 1,
    description_cn?: string,
    item_id?: string,
    origin_country?: string,
    weight?: Weight,
    sku?: string,
    hs_code?: string,
    return_reason?: string,
  ) {
    this.quantity = quantity;
    this.price = price;
    this.description = description;
    this.description_cn = description_cn;
    this.item_id = item_id;
    this.origin_country = origin_country;
    this.weight = weight;
    this.sku = sku;
    this.hs_code = hs_code;
    this.return_reason = return_reason;
  }
}
