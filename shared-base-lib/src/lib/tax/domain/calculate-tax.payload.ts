import { AutoMap } from "@automapper/classes";
import { TaxItem } from "./internal-domain-data";

/**
 * Payload for calculating tax
 * @see https://developers.taxjar.com/api/reference/?javascript#post-calculate-sales-tax-for-an-order
 * @see https://support.taxjar.com/article/641-why-should-i-send-line-items
 *
 * @description 'amount' or 'lineItems' must be provided (If lineItems are provided, amount is ignored)
 * @param amount - Total amount of the order, excluding 'shipping'.
 */
export class CalculateTaxPayload {
  @AutoMap()
  public fromCountry?: string;

  @AutoMap()
  public fromZip?: string;

  @AutoMap()
  public fromState?: string;

  @AutoMap()
  public fromCity?: string;

  @AutoMap()
  public fromStreet?: string;

  @AutoMap()
  public toCountry: string;

  @AutoMap()
  public toZip: string;

  @AutoMap()
  public toState: string;

  @AutoMap()
  public toCity?: string;

  @AutoMap()
  public toStreet?: string;

  @AutoMap()
  public amount?: number;

  @AutoMap()
  public shipping: number;

  @AutoMap(() => [TaxItem])
  public lineItems?: TaxItem[];
}
