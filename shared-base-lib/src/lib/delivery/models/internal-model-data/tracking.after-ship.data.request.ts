import { AutoMap } from "@automapper/classes";
import { NextCourierData } from "./primitive-data";
import { EDeliveryType, EShipperAccount, EDeliverySlugGroup } from "../../domain";
import { ECountryCodeIso3 } from "../../../types";

export class TrackingAfterShipDataRequest {
  @AutoMap()
  public tracking_number: string;

  @AutoMap(() => String)
  public slug?: EShipperAccount;

  @AutoMap()
  public title?: string;

  @AutoMap()
  public order_id?: string;

  @AutoMap()
  public order_id_path?: string;

  @AutoMap(() => Object)
  public custom_fields?: Record<string, string>;

  @AutoMap()
  public language?: string;

  @AutoMap(() => Date)
  public order_promised_delivery_date?: Date;

  @AutoMap(() => String)
  public delivery_type?: EDeliveryType;

  @AutoMap()
  public pickup_location?: string;

  @AutoMap()
  public pickup_note?: string;

  @AutoMap()
  public tracking_account_number?: string;

  @AutoMap()
  public tracking_key?: string;

  @AutoMap()
  public tracking_ship_date?: string;

  @AutoMap(() => [String])
  public emails?: string[];

  @AutoMap(() => [String])
  public smses?: string[];

  @AutoMap()
  public customer_name?: string;

  @AutoMap(() => String)
  public origin_country_iso3?: ECountryCodeIso3;

  @AutoMap()
  public origin_state?: string;

  @AutoMap()
  public origin_city?: string;

  @AutoMap()
  public origin_postal_code?: string;

  @AutoMap()
  public origin_raw_location?: string;

  @AutoMap(() => String)
  public destination_country_iso3?: ECountryCodeIso3;

  @AutoMap()
  public destination_state?: string;

  @AutoMap()
  public destination_city?: string;

  @AutoMap()
  public destination_postal_code?: string;

  @AutoMap()
  public destination_raw_location?: string;

  @AutoMap()
  public note?: string;

  @AutoMap(() => String)
  public slug_group?: EDeliverySlugGroup;

  @AutoMap(() => Date)
  public order_date?: Date;

  @AutoMap()
  public order_number?: string;

  @AutoMap()
  public shipment_type?: string;

  @AutoMap(() => [String])
  public shipment_tags?: string[];

  @AutoMap()
  public courier_connection_id?: string;

  @AutoMap(() => [NextCourierData])
  public next_couriers?: NextCourierData[];

  @AutoMap(() => String)
  public tracking_origin_country?: ECountryCodeIso3;

  @AutoMap(() => String)
  public tracking_destination_country?: ECountryCodeIso3;

  @AutoMap()
  public tracking_postal_code?: string;

  @AutoMap()
  public tracking_state?: string;

  @AutoMap()
  public location_id?: string;

  @AutoMap()
  public shipping_method?: string;
}
