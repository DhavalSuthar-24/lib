import { AutoMap } from "@automapper/classes";
import { CheckpointModelData } from "./checkpoint.model.data";
import { CarbonEmission } from "../../domain";
import { EstimatedDeliveryModelData, EstimatedDeliveryDateModelData, NextCourierData } from "./primitive-data";

export class TrackingAfterShipDataResponse {
  @AutoMap()
  public id?: string;

  @AutoMap()
  public created_at?: string;

  @AutoMap()
  public updated_at?: string;

  @AutoMap()
  public last_updated_at?: string;

  @AutoMap()
  public tracking_number?: string;

  @AutoMap()
  public slug?: string;

  @AutoMap()
  public active?: boolean;

  @AutoMap(() => Object)
  public custom_fields?: Record<string, string>;

  @AutoMap()
  public customer_name?: string;

  @AutoMap()
  public transit_time?: number;

  @AutoMap()
  public origin_country_iso3?: string;

  @AutoMap()
  public origin_state?: string;

  @AutoMap()
  public origin_city?: string;

  @AutoMap()
  public origin_postal_code?: string;

  @AutoMap()
  public origin_raw_location?: string;

  @AutoMap()
  public destination_country_iso3?: string;

  @AutoMap()
  public destination_state?: string;

  @AutoMap()
  public destination_city?: string;

  @AutoMap()
  public destination_postal_code?: string;

  @AutoMap()
  public destination_raw_location?: string;

  @AutoMap()
  public courier_destination_country_iso3?: string;

  @AutoMap(() => [String])
  public emails?: string[];

  @AutoMap()
  public expected_delivery?: string;

  @AutoMap()
  public note?: string;

  @AutoMap()
  public order_id?: string;

  @AutoMap()
  public order_id_path?: string;

  @AutoMap()
  public order_date?: string;

  @AutoMap()
  public shipment_package_count?: number;

  @AutoMap()
  public shipment_pickup_date?: string;

  @AutoMap()
  public shipment_delivery_date?: string;

  @AutoMap()
  public shipment_type?: string;

  @AutoMap()
  public shipment_weight?: number;

  @AutoMap()
  public shipment_weight_unit?: string;

  @AutoMap()
  public signed_by?: string;

  @AutoMap(() => [String])
  public smses?: string[];

  @AutoMap()
  public source?: string;

  @AutoMap()
  public tag?: string;

  @AutoMap()
  public subtag?: string;

  @AutoMap()
  public subtag_message?: string;

  @AutoMap()
  public title?: string;

  @AutoMap()
  public tracked_count?: number;

  @AutoMap()
  public last_mile_tracking_supported?: boolean;

  @AutoMap()
  public language?: string;

  @AutoMap()
  public unique_token?: string;

  @AutoMap(() => [CheckpointModelData])
  public checkpoints?: CheckpointModelData[];

  @AutoMap(() => [String])
  public subscribed_smses?: string[];

  @AutoMap(() => [String])
  public subscribed_emails?: string[];

  @AutoMap()
  public return_to_sender?: boolean;

  @AutoMap()
  public order_promised_delivery_date?: string;

  @AutoMap()
  public delivery_type?: string;

  @AutoMap()
  public pickup_location?: string;

  @AutoMap()
  public pickup_note?: string;

  @AutoMap()
  public courier_tracking_link?: string;

  @AutoMap()
  public first_attempted_at?: string;

  @AutoMap()
  public courier_redirect_link?: string;

  @AutoMap()
  public tracking_account_number?: string;

  @AutoMap()
  public tracking_key?: string;

  @AutoMap()
  public tracking_ship_date?: string;

  @AutoMap()
  public on_time_status?: string;

  @AutoMap()
  public on_time_difference?: number;

  @AutoMap(() => [String])
  public order_tags?: string[];

  @AutoMap(() => EstimatedDeliveryDateModelData)
  public aftership_estimated_delivery_date?: EstimatedDeliveryDateModelData;

  @AutoMap(() => EstimatedDeliveryDateModelData)
  public custom_estimated_delivery_date?: EstimatedDeliveryDateModelData;

  @AutoMap()
  public order_number?: string;

  @AutoMap(() => EstimatedDeliveryModelData)
  public first_estimated_delivery?: EstimatedDeliveryModelData;

  @AutoMap(() => EstimatedDeliveryModelData)
  public latest_estimated_delivery?: EstimatedDeliveryModelData;

  @AutoMap(() => [String])
  public shipment_tags?: string[];

  @AutoMap()
  public courier_connection_id?: string;

  @AutoMap(() => [NextCourierData])
  public next_couriers?: NextCourierData[];

  @AutoMap()
  public tracking_origin_country?: string;

  @AutoMap()
  public tracking_destination_country?: string;

  @AutoMap()
  public tracking_postal_code?: string;

  @AutoMap()
  public tracking_state?: string;

  @AutoMap(() => CarbonEmission)
  public carbon_emissions?: CarbonEmission;

  @AutoMap()
  public location_id?: string;

  @AutoMap()
  public shipping_method?: string;

  @AutoMap()
  public failed_delivery_attempts?: number;

  @AutoMap()
  public signature_requirement?: string;
}
