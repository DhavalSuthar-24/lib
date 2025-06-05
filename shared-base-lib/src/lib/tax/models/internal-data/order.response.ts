import { AutoMap } from "@automapper/classes";
import { LineItemResponse } from "./line-item.response";

export class OrderResponse {
  @AutoMap()
  public transaction_id: string;

  @AutoMap()
  public user_id: number;

  @AutoMap(() => Date)
  public transaction_date: Date;

  @AutoMap()
  public provider: string;

  @AutoMap()
  public exemption_type?: string;

  @AutoMap()
  public from_country?: string;

  @AutoMap()
  public from_zip?: string;

  @AutoMap()
  public from_state?: string;

  @AutoMap()
  public from_city?: string;

  @AutoMap()
  public from_street?: string;

  @AutoMap()
  public to_country: string;

  @AutoMap()
  public to_zip: string;

  @AutoMap()
  public to_state: string;

  @AutoMap()
  public to_city?: string;

  @AutoMap()
  public to_street?: string;

  @AutoMap()
  public amount: number;

  @AutoMap()
  public shipping: number;

  @AutoMap()
  public sales_tax: number;

  @AutoMap(() => [LineItemResponse])
  public line_items: LineItemResponse[];
}
