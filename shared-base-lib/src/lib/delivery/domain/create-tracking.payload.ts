import { AutoMap } from "@automapper/classes";
import { EDeliverySlugGroup, EDeliveryType, EShipperAccount } from "./enums";
import { ECountryCodeIso3 } from "../../types";
import { NextCourier } from "./internal-domain-data";

export class CreateTrackingPayload {
  @AutoMap()
  public trackingNumber: string;

  @AutoMap(() => String)
  public slug?: EShipperAccount;

  @AutoMap()
  public title?: string;

  @AutoMap()
  public orderId?: string;

  @AutoMap()
  public orderIdPath?: string;

  @AutoMap(() => Object)
  public customFields?: Record<string, string>;

  @AutoMap()
  public language?: string;

  @AutoMap(() => Date)
  public orderPromisedDeliveryDate?: Date;

  @AutoMap(() => String)
  public deliveryType?: EDeliveryType;

  @AutoMap()
  public pickupLocation?: string;

  @AutoMap()
  public pickupNote?: string;

  @AutoMap()
  public trackingAccountNumber?: string;

  @AutoMap()
  public trackingKey?: string;

  @AutoMap()
  public trackingShipDate?: string;

  @AutoMap(() => [String])
  public emails?: string[];

  @AutoMap(() => [String])
  public smses?: string[];

  @AutoMap()
  public customerName?: string;

  @AutoMap(() => String)
  public originCountryIso3?: ECountryCodeIso3;

  @AutoMap()
  public originState?: string;

  @AutoMap()
  public originCity?: string;

  @AutoMap()
  public originPostalCode?: string;

  @AutoMap()
  public originRawLocation?: string;

  @AutoMap(() => String)
  public destinationCountryIso3?: ECountryCodeIso3;

  @AutoMap()
  public destinationState?: string;

  @AutoMap()
  public destinationCity?: string;

  @AutoMap()
  public destinationPostalCode?: string;

  @AutoMap()
  public destinationRawLocation?: string;

  @AutoMap()
  public note?: string;

  @AutoMap(() => String)
  public slugGroup?: EDeliverySlugGroup;

  @AutoMap(() => Date)
  public orderDate?: Date;

  @AutoMap()
  public orderNumber?: string;

  @AutoMap()
  public shipmentType?: string;

  @AutoMap(() => [String])
  public shipmentTags?: string[];

  @AutoMap()
  public courierConnectionId?: string;

  @AutoMap(() => [NextCourier])
  public nextCouriers?: NextCourier[];

  @AutoMap(() => String)
  public trackingOriginCountry?: ECountryCodeIso3;

  @AutoMap(() => String)
  public trackingDestinationCountry?: ECountryCodeIso3;

  @AutoMap()
  public trackingPostalCode?: string;

  @AutoMap()
  public trackingState?: string;

  @AutoMap()
  public locationId?: string;

  @AutoMap()
  public shippingMethod?: string;
}
