import { AutoMap } from "@automapper/classes";

export class Venmo {
  @AutoMap()
  public consumerId: string;

  @AutoMap()
  public merchantAccountId?: string;

  @AutoMap()
  public profileId?: string;

  constructor(consumerId: string, merchantAccountId?: string, profileId?: string) {
    this.consumerId = consumerId;
    this.merchantAccountId = merchantAccountId;
    this.profileId = profileId;
  }
}
