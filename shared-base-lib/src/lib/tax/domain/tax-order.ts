import { AutoMap } from "@automapper/classes";
import { TaxItem } from "./internal-domain-data";

export class TaxOrder {
  @AutoMap()
  public transactionId: string;

  @AutoMap()
  public userId: number;

  @AutoMap(() => Date)
  public transactionDate: Date;

  @AutoMap()
  public provider: string;

  @AutoMap()
  public exemptionType?: string;

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

  @AutoMap(() => [TaxItem])
  public lineItems: TaxItem[];
}
