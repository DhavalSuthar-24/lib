import { AutoMap } from "@automapper/classes";
import { ERecipientType, EShippingPreference } from "../enums";

export class Paypal {
  @AutoMap()
  public consumerId?: string;

  @AutoMap()
  public recipientDescription?: string;

  @AutoMap()
  public language?: string;

  @AutoMap(() => String)
  public shippingPreference?: EShippingPreference;

  @AutoMap()
  public consumerMessage?: string;

  @AutoMap()
  public orderDescription?: string;

  @AutoMap(() => String)
  public recipientType?: ERecipientType;

  constructor(
    consumerId?: string,
    recipientType?: ERecipientType,
    recipientDescription?: string,
    language?: string,
    shippingPreference?: EShippingPreference,
    consumerMessage?: string,
    orderDescription?: string,
  ) {
    this.consumerId = consumerId;
    this.recipientType = recipientType;
    this.recipientDescription = recipientDescription;
    this.language = language;
    this.shippingPreference = shippingPreference;
    this.consumerMessage = consumerMessage;
    this.orderDescription = orderDescription;
  }
}
