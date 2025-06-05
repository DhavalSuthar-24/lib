import { AutoMap } from "@automapper/classes";
import { LineItem, NexusAddress } from "./internal-data";

export class CalculateTaxRequest {
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
  public amount?: number;

  @AutoMap()
  public shipping: number;

  @AutoMap()
  public customer_id?: string;

  @AutoMap()
  public exemption_type?: string;

  @AutoMap(() => [NexusAddress])
  public nexus_addresses?: NexusAddress[];

  @AutoMap(() => [LineItem])
  public line_items?: LineItem[];
}
