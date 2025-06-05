import { AutoMap } from "@automapper/classes";
import { TaxItem } from "./internal-domain-data";

/**
 * Create Tax Order Payload
 * @see https://developers.taxjar.com/api/reference/?javascript#post-create-an-order-transaction
 * @see https://support.taxjar.com/article/641-why-should-i-send-line-items
 *
 * @param amount - Total amount of the order with shipping, excluding sales tax in dollars.
 * @param shipping - Total amount of shipping for the order in dollars.
 * @param salesTax - Total amount of sales tax collected for the order in dollars.
 */
export class CreateTaxOrderPayload {
  @AutoMap()
  public transactionId: string;

  @AutoMap(() => Date)
  public transactionDate: Date;

  @AutoMap()
  public provider?: string;

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
  public amount: number;

  @AutoMap()
  public shipping: number;

  @AutoMap()
  public salesTax: number;

  @AutoMap()
  public customerId?: string;

  @AutoMap()
  public exemptionType?: string;

  @AutoMap(() => [TaxItem])
  public lineItems: TaxItem[];
}
