import { AutoMap } from "@automapper/classes";

export class ApplePayHeaderResponse {
  @AutoMap()
  public transactionId: string;

  @AutoMap()
  public ephemeralPublicKey: string;

  @AutoMap()
  public publicKeyHash: string;
}
