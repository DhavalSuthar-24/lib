import {
  CalculateRatesPayload,
  CarrierAccount,
  CreateLabelPayload,
  ShippingLabel,
  ShippingRate,
  EShipperAccount,
  AfterShipAddressValidationStatus,
  CreateTrackingPayload,
  Tracking,
} from "./domain";
import { Address } from "../types";

export interface IBaseAfterShipService {
  listCarrierAccountsAsync(): Promise<CarrierAccount[]>;
  calculateRatesAsync(payload: CalculateRatesPayload, slug?: EShipperAccount): Promise<ShippingRate[]>;
  getRatesByIdAsync(id: string): Promise<ShippingRate[]>;
  createLabelAsync(payload: CreateLabelPayload): Promise<ShippingLabel>;
  getLabelAsync(id: string): Promise<ShippingLabel>;
  cancelLabelAsync(id: string): Promise<void>;
  validateAddressAsync(address: Address): Promise<AfterShipAddressValidationStatus>;
  createTrackingAsync(payload: CreateTrackingPayload): Promise<Tracking>;
  getTrackingByIdAsync(trackingId: string): Promise<Tracking>;
  deleteTrackingByIdAsync(trackingId: string): Promise<void>;
}
