import { AutoMap } from "@automapper/classes";
import { IPaysafeOptions } from "../i-paysafe.options";

export class PaysafeCredentials implements Omit<IPaysafeOptions, "apiKey" | "apiUrl"> {
  @AutoMap()
  public publicKey: string;

  @AutoMap()
  public accountId: string;

  @AutoMap()
  public googleMerchantId: string;

  @AutoMap()
  public googleMerchantName: string;

  @AutoMap()
  public providerName: string;

  @AutoMap()
  public publicProviderId: string;

  @AutoMap()
  public paypalAccountId: string;

  @AutoMap()
  public venmoAccountId: string;

  constructor(
    publicKey: string,
    accountId: string,
    paypalAccountId: string,
    venmoAccountId: string,
    googleMerchantId: string,
    googleMerchantName: string,
    providerName: string,
    publicProviderId: string,
  ) {
    this.publicKey = publicKey;
    this.accountId = accountId;
    this.paypalAccountId = paypalAccountId;
    this.venmoAccountId = venmoAccountId;
    this.googleMerchantId = googleMerchantId;
    this.googleMerchantName = googleMerchantName;
    this.providerName = providerName;
    this.publicProviderId = publicProviderId;
  }
}
