import { AutoMap } from "@automapper/classes";
import { CarbonEmission, CheckpointData, EstimatedDeliveryData, EstimatedDeliveryDateData, NextCourierData } from "..";

export class Tracking {
  @AutoMap()
  public id?: string;

  @AutoMap()
  public createdAt?: string;

  @AutoMap()
  public updatedAt?: string;

  @AutoMap()
  public lastUpdatedAt?: string;

  @AutoMap()
  public trackingNumber?: string;

  @AutoMap()
  public slug?: string;

  @AutoMap()
  public active?: boolean;

  @AutoMap(() => Object)
  public customFields?: Record<string, string>;

  @AutoMap()
  public customerName?: string;

  @AutoMap()
  public transitTime?: number;

  @AutoMap()
  public originCountryIso3?: string;

  @AutoMap()
  public originState?: string;

  @AutoMap()
  public originCity?: string;

  @AutoMap()
  public originPostalCode?: string;

  @AutoMap()
  public originRawLocation?: string;

  @AutoMap()
  public destinationCountryIso3?: string;

  @AutoMap()
  public destinationState?: string;

  @AutoMap()
  public destinationCity?: string;

  @AutoMap()
  public destinationPostalCode?: string;

  @AutoMap()
  public destinationRawLocation?: string;

  @AutoMap()
  public courierDestinationCountryIso3?: string;

  @AutoMap(() => [String])
  public emails?: string[];

  @AutoMap()
  public expectedDelivery?: string;

  @AutoMap()
  public note?: string;

  @AutoMap()
  public orderId?: string;

  @AutoMap()
  public orderIdPath?: string;

  @AutoMap()
  public orderDate?: string;

  @AutoMap()
  public shipmentPackageCount?: number;

  @AutoMap()
  public shipmentPickupDate?: string;

  @AutoMap()
  public shipmentDeliveryDate?: string;

  @AutoMap()
  public shipmentType?: string;

  @AutoMap()
  public shipmentWeight?: number;

  @AutoMap()
  public shipmentWeightUnit?: string;

  @AutoMap()
  public signedBy?: string;

  @AutoMap(() => [String])
  public smses?: string[];

  @AutoMap()
  public source?: string;

  @AutoMap()
  public tag?: string;

  @AutoMap()
  public subtag?: string;

  @AutoMap()
  public subtagMessage?: string;

  @AutoMap()
  public title?: string;

  @AutoMap()
  public trackedCount?: number;

  @AutoMap()
  public lastMileTrackingSupported?: boolean;

  @AutoMap()
  public language?: string;

  @AutoMap()
  public uniqueToken?: string;

  @AutoMap(() => [CheckpointData])
  public checkpoints?: CheckpointData[];

  @AutoMap(() => [String])
  public subscribedSmses?: string[];

  @AutoMap(() => [String])
  public subscribedEmails?: string[];

  @AutoMap()
  public returnToSender?: boolean;

  @AutoMap()
  public orderPromisedDeliveryDate?: string;

  @AutoMap()
  public deliveryType?: string;

  @AutoMap()
  public pickupLocation?: string;

  @AutoMap()
  public pickupNote?: string;

  @AutoMap()
  public courierTrackingLink?: string;

  @AutoMap()
  public firstAttemptedAt?: string;

  @AutoMap()
  public courierRedirectLink?: string;

  @AutoMap()
  public trackingAccountNumber?: string;

  @AutoMap()
  public trackingKey?: string;

  @AutoMap()
  public trackingShipDate?: string;

  @AutoMap()
  public onTimeStatus?: string;

  @AutoMap()
  public onTimeDifference?: number;

  @AutoMap(() => [String])
  public orderTags?: string[];

  @AutoMap(() => EstimatedDeliveryDateData)
  public aftershipEstimatedDeliveryDate?: EstimatedDeliveryDateData;

  @AutoMap(() => EstimatedDeliveryDateData)
  public customEstimatedDeliveryDate?: EstimatedDeliveryDateData;

  @AutoMap()
  public orderNumber?: string;

  @AutoMap(() => EstimatedDeliveryData)
  public firstEstimatedDelivery?: EstimatedDeliveryData;

  @AutoMap(() => EstimatedDeliveryData)
  public latestEstimatedDelivery?: EstimatedDeliveryData;

  @AutoMap(() => [String])
  public shipmentTags?: string[];

  @AutoMap()
  public courierConnectionId?: string;

  @AutoMap(() => [NextCourierData])
  public nextCouriers?: NextCourierData[];

  @AutoMap()
  public trackingOriginCountry?: string;

  @AutoMap()
  public trackingDestinationCountry?: string;

  @AutoMap()
  public trackingPostalCode?: string;

  @AutoMap()
  public trackingState?: string;

  @AutoMap(() => CarbonEmission)
  public carbonEmissions?: CarbonEmission;

  @AutoMap()
  public locationId?: string;

  @AutoMap()
  public shippingMethod?: string;

  @AutoMap()
  public failedDeliveryAttempts?: number;

  @AutoMap()
  public signatureRequirement?: string;
}
