import { AutoMap } from "@automapper/classes";
import { Breakdown, Jurisdictions, LineItemResponse } from "./index";

export class Tax {
  @AutoMap()
  public order_total_amount: number;

  @AutoMap()
  public shipping: number;

  @AutoMap()
  public taxable_amount: number;

  @AutoMap()
  public amount_to_collect: number;

  @AutoMap()
  public rate: number;

  @AutoMap()
  public has_nexus: boolean;

  @AutoMap()
  public freight_taxable: boolean;

  @AutoMap()
  public tax_source: string;

  @AutoMap(() => Jurisdictions)
  public jurisdictions: Jurisdictions;

  @AutoMap(() => Breakdown)
  public breakdown: Breakdown;

  @AutoMap(() => [LineItemResponse])
  public line_items: LineItemResponse[];
}
