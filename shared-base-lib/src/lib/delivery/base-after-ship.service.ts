import { Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";
import { InjectSentry, SentryService } from "@ntegral/nestjs-sentry";
import { filter, first, includes, isNilOrEmpty, isUndefined, map } from "@bit-core-api/shared-utils-lib";
import { AfterShipException } from "./exceptions";
import {
  AddressAfterShipModel,
  AddressValidationAfterShipRequest,
  AddressValidationAfterShipResponse,
  CalculateRatesRequest,
  CreateLabelRequest,
  CreateTrackingRequest,
  Item,
  Label,
  LabelResponse,
  Meta,
  Parcel,
  Rate,
  RatesResponse,
  Shipment,
  ShipperAccount,
  ShipperAccountsResponse,
  TrackingAfterShipDataRequest,
  TrackingAfterShipDataResponse,
  TrackingResponse,
  ValidationDataResponse,
} from "./models";
import { IAfterShipOptions } from "./i-after-ship.options";
import { AxiosRequestBuilder, EHttpMethod, IRequestBuilder } from "../http";
import { getCountryCodeISO3, getStateCodeISO2, isProd } from "../tools";
import {
  AfterShipAddressValidationStatus,
  CalculateRatesPayload,
  CarrierAccount,
  CreateLabelPayload,
  CreateTrackingPayload,
  ECalculateDeliveryRateStatus,
  EDeliveryLabelStatus,
  EDeliveryValidationStatus,
  EShipperAccount,
  ShipperAccountId,
  ShippingLabel,
  ShippingRate,
  Tracking,
} from "./domain";
import { IBaseAfterShipService } from "./i-base-after-ship.service";
import { Address } from "../types";
import { range } from "lodash";

export enum EApiUrlType {
  Shipping = "shipping",
  Tracking = "tracking",
}
const DELAY_2_SECONDS = 2000;
const MAX_ATTEMPT = 5;
const AFTER_SHIP_INTERNAL_ERROR_CODE_500 = 500;
const AFTER_SHIP_INTERNAL_ERROR_CODE_599 = 599;
const AFTER_SHIP_BAD_REQUEST_CODE_400 = 400;
const AFTER_SHIP_BAD_REQUEST_CODE_499 = 499;
const AFTER_SHIP_BAD_REQUEST_CODE_4000 = 4000;
const AFTER_SHIP_BAD_REQUEST_CODE_4999 = 4999;

@Injectable()
export abstract class BaseAfterShipService implements IBaseAfterShipService {
  protected constructor(
    protected readonly options: IAfterShipOptions,
    protected readonly mapper: Mapper,
    protected readonly logger: PinoLogger,
    @InjectSentry() protected readonly sentry: SentryService,
  ) {}

  public async calculateRatesAsync(payload: CalculateRatesPayload, slug?: EShipperAccount): Promise<ShippingRate[]> {
    this.logger.debug(payload, "Executing AfterShip - Calculate Rates");
    const rateRequest = this.generateRatesRequest(payload);

    // Get all shipper accounts
    const shipperAccountsBuilder = this.getRequestBuilder(EApiUrlType.Shipping)
      .setMethod(EHttpMethod.Get)
      .setEndpoint("/shipper-accounts")
      .addQueryParam("slug", !isUndefined(slug) ? slug : "")
      .build<ShipperAccountsResponse>();
    const shipperAccountsResponse = await shipperAccountsBuilder.execute();

    if (!isProd()) {
      const validSlugs: string[] = [EShipperAccount.Ups, EShipperAccount.Fedex];
      rateRequest.shipper_accounts = map(
        filter(shipperAccountsResponse.data.shipper_accounts, (account) => includes(validSlugs, account.slug)),
        (sa) => new ShipperAccountId(sa.id),
      );
    }

    this.logger.debug(rateRequest, "AfterShip - Calculate Rates Request");
    const response = await this.createRatesAsync(rateRequest);
    return this.mapper.mapArray(response.data?.rates, Rate, ShippingRate);
  }

  public async getRatesByIdAsync(id: string): Promise<ShippingRate[]> {
    this.logger.debug({ id }, "Executing AfterShip - Get Rate");
    const builder = this.getRequestBuilder(EApiUrlType.Shipping).setMethod(EHttpMethod.Get).setEndpoint(`/rates/${id}`).build<RatesResponse>();
    const response = await builder.execute();
    this.logger.debug({ response }, "AfterShip - Get Rate Response");
    response.data.rates = filter(response.data?.rates, (rate) => !isNilOrEmpty(rate.total_charge) && isNilOrEmpty(rate.error_message));
    return !isNilOrEmpty(response.data) ? this.mapper.mapArray(response.data.rates, Rate, ShippingRate) : null;
  }

  public async listCarrierAccountsAsync(): Promise<CarrierAccount[]> {
    this.logger.debug("Executing AfterShip - Carrier Accounts");
    const builder = this.getRequestBuilder(EApiUrlType.Shipping).setMethod(EHttpMethod.Get).setEndpoint("/shipper-accounts").build<ShipperAccountsResponse>();
    const response = await builder.execute();
    return this.mapper.mapArray(response.data?.shipper_accounts, ShipperAccount, CarrierAccount);
  }

  public async createLabelAsync(payload: CreateLabelPayload, attempt = 1): Promise<ShippingLabel> {
    this.logger.debug(payload, `Executing AfterShip - Create Label, Attempt: ${attempt}`);
    const labelRequest = this.generateLabelRequest(payload);
    const builder = this.getRequestBuilder(EApiUrlType.Shipping).setMethod(EHttpMethod.Post).setEndpoint("/labels").setBody(labelRequest).build<LabelResponse>();
    let response = await builder.execute();
    const isError =
      !includes([EDeliveryLabelStatus.Created, EDeliveryLabelStatus.Creating], response.data.status) ||
      this.isAfterShipInternalError(response.meta) ||
      this.isBadRequestError(response.meta);
    if (isError) {
      if (attempt < MAX_ATTEMPT) {
        return this.createLabelAsync(payload, attempt + 1);
      }
      this.logger.error({ response }, "AfterShip - Create Label Error");
      throw new AfterShipException(first(response.meta?.details)?.info);
    }
    if (response.data.status === EDeliveryLabelStatus.Creating) {
      response = await this.waitForLabelToBeCreatedAsync(response.data.id);
    }
    this.logger.debug(response.data, "AfterShip - Create Label Response");
    return this.mapper.map(response.data, Label, ShippingLabel);
  }

  public async getLabelAsync(id: string): Promise<ShippingLabel> {
    this.logger.debug({ id }, "Executing AfterShip - Get Label");
    const builder = this.getRequestBuilder(EApiUrlType.Shipping).setMethod(EHttpMethod.Get).setEndpoint(`/labels/${id}`).build<LabelResponse>();
    const response = await builder.execute();
    this.logger.debug(response.data, "AfterShip - Get Label Response");
    return !isNilOrEmpty(response.data) ? this.mapper.map(response.data, Label, ShippingLabel) : null;
  }

  public async cancelLabelAsync(id: string): Promise<void> {
    this.logger.debug({ id }, "Executing AfterShip - Cancel Label");
    const builder = this.getRequestBuilder(EApiUrlType.Shipping).setMethod(EHttpMethod.Post).setBody({ label: { id } }).setEndpoint(`/cancel-labels`).build();
    await builder.execute();
    this.logger.debug("AfterShip - Cancel Label Response");
  }

  public async validateAddressAsync(address: Address): Promise<AfterShipAddressValidationStatus> {
    this.logger.debug(address, "Executing AfterShip - Validate Address");
    const addressModel = this.mapper.map(address, Address, AddressAfterShipModel);
    addressModel.state = getStateCodeISO2(address.state);
    addressModel.country = getCountryCodeISO3(address.country);
    const request = new AddressValidationAfterShipRequest(addressModel);
    const builder = this.getRequestBuilder(EApiUrlType.Shipping)
      .setMethod(EHttpMethod.Post)
      .setBody(request)
      .setEndpoint(`/address-validations`)
      .build<AddressValidationAfterShipResponse>();
    const response = await builder.execute();
    this.logger.debug(response, "AfterShip - Validate Address Response");
    const isValid = !isNilOrEmpty(response.data) && response.data?.status === EDeliveryValidationStatus.Valid;
    const message = isValid ? response.meta.message : this.generateErrorMessage(response.data);
    return new AfterShipAddressValidationStatus(isValid, message);
  }

  public async createTrackingAsync(payload: CreateTrackingPayload): Promise<Tracking> {
    this.logger.debug(payload, "Executing AfterShip - Create Tracking");
    const requestData = this.mapper.map(payload, CreateTrackingPayload, TrackingAfterShipDataRequest);
    const request = new CreateTrackingRequest(requestData);
    const builder = this.getRequestBuilder(EApiUrlType.Tracking).setMethod(EHttpMethod.Post).setBody(request).setEndpoint(`/trackings`).build<TrackingResponse>();
    const response = await builder.execute();
    this.logger.debug(response, "AfterShip - Create Tracking Response");
    return this.mapper.map(response.data.tracking, TrackingAfterShipDataResponse, Tracking);
  }

  public async getTrackingByIdAsync(trackingId: string): Promise<Tracking> {
    this.logger.debug({ trackingId }, "Executing AfterShip - Get Tracking");
    const builder = this.getRequestBuilder(EApiUrlType.Tracking).setMethod(EHttpMethod.Get).setEndpoint(`/trackings/${trackingId}`).build<TrackingResponse>();
    const response = await builder.execute();
    this.logger.debug(response, "AfterShip - Get Tracking Response");
    return !isNilOrEmpty(response.data) ? this.mapper.map(response.data.tracking, TrackingAfterShipDataResponse, Tracking) : null;
  }

  public async deleteTrackingByIdAsync(trackingId: string): Promise<void> {
    this.logger.debug({ trackingId }, "Executing AfterShip - Delete Tracking");
    const builder = this.getRequestBuilder(EApiUrlType.Tracking).setMethod(EHttpMethod.Delete).setEndpoint(`/trackings/${trackingId}`).build<TrackingResponse>();
    const response = await builder.execute();
    this.logger.debug(response, "AfterShip - Delete Tracking Response");
    this.logger.info(`AfterShip - Tracking with id: ${trackingId} deleted successfully`);
  }

  private async createRatesAsync(payload: CalculateRatesRequest, attempt = 1): Promise<RatesResponse> {
    this.logger.info(`AfterShip - creating rates, Attempt: ${attempt}`);
    const builder = this.getRequestBuilder(EApiUrlType.Shipping).setMethod(EHttpMethod.Post).setEndpoint("/rates").setBody(payload).build<RatesResponse>();
    let response = await builder.execute();
    this.logger.debug({ response }, "AfterShip - Calculate Rates Response");
    if (response.data?.status === ECalculateDeliveryRateStatus.Failed) {
      throw new AfterShipException("Failed to calculate rates. Please check the address and try again.");
    }
    response.data.rates = filter(response.data?.rates, (rate) => !isNilOrEmpty(rate.total_charge) && isNilOrEmpty(rate.error_message));

    if (response.data?.status === ECalculateDeliveryRateStatus.Calculating) {
      response = await this.getRatesAsync(response.data.id);
    }

    if (isNilOrEmpty(response.data?.rates) || response.data?.status === ECalculateDeliveryRateStatus.Calculating) {
      if (attempt < MAX_ATTEMPT) {
        return this.createRatesAsync(payload, attempt + 1);
      }
      throw new AfterShipException(`Failed to calculate rates ${attempt} times. Please check the address and try again later.`);
    }
    return response;
  }

  private generateErrorMessage(data: ValidationDataResponse): string {
    const recommendedAddress = data?.recommended_address;
    return !isNilOrEmpty(recommendedAddress)
      ? `The address you provided is not valid, maybe you meant: ${recommendedAddress.street1}, ${recommendedAddress.city}, ${recommendedAddress.state}, ${recommendedAddress.postal_code}`
      : "Error validating the address, try again.";
  }

  private async getRatesAsync(id: string): Promise<RatesResponse> {
    this.logger.debug({ id }, "Executing AfterShip - Get Rates");
    const builder = this.getRequestBuilder(EApiUrlType.Shipping).setMethod(EHttpMethod.Get).setEndpoint(`/rates/${id}`).build<RatesResponse>();
    const response = await builder.execute();
    this.logger.debug({ response }, "AfterShip - Get Rates Response");
    return response;
  }

  private isAfterShipInternalError(meta: Meta): boolean {
    // https://www.aftership.com/docs/tracking/quickstart/request-errors
    // TODO move this values to a constant
    const afterShipInternalErrorCodes = range(AFTER_SHIP_INTERNAL_ERROR_CODE_500, AFTER_SHIP_INTERNAL_ERROR_CODE_599);
    return includes(afterShipInternalErrorCodes, meta.code);
  }

  private isBadRequestError(meta: Meta): boolean {
    // https://www.aftership.com/docs/tracking/quickstart/request-errors
    const badRequestErrorCodes = [
      ...range(AFTER_SHIP_BAD_REQUEST_CODE_400, AFTER_SHIP_BAD_REQUEST_CODE_499),
      ...range(AFTER_SHIP_BAD_REQUEST_CODE_4000, AFTER_SHIP_BAD_REQUEST_CODE_4999),
    ];
    return includes(badRequestErrorCodes, meta.code);
  }

  private waitForLabelToBeCreatedAsync(labelId: string, attempt: number = 1): Promise<LabelResponse> {
    this.logger.info(`AfterShip - waiting for label to be created, Attempt: ${attempt}`);
    return new Promise((resolve, reject) => {
      if (attempt > MAX_ATTEMPT) {
        reject(new AfterShipException("Failed to create label. Please try again later."));
      } else {
        setTimeout(() => {
          (async (): Promise<void> => {
            const builder = this.getRequestBuilder(EApiUrlType.Shipping).setMethod(EHttpMethod.Get).setEndpoint(`/labels/${labelId}`).build<LabelResponse>();
            const response = await builder.execute();
            this.logger.debug({ response }, `Attempt: ${attempt} - AfterShip - Get Label Response`);
            if (response.data.status === EDeliveryLabelStatus.Created) {
              resolve(response);
            } else {
              resolve(await this.waitForLabelToBeCreatedAsync(labelId, attempt + 1));
            }
          })();
        }, DELAY_2_SECONDS);
      }
    });
  }

  private generateLabelRequest(payload: CreateLabelPayload): CreateLabelRequest {
    const req = this.mapper.map(payload, CreateLabelPayload, CreateLabelRequest);
    req.shipment = this.generateShipmentRequest(payload);
    const parcel = first(req.shipment.parcels);
    parcel.items = [new Item(payload.assetName, payload.price)];
    return req;
  }

  private generateRatesRequest(payload: CalculateRatesPayload): CalculateRatesRequest {
    const req = new CalculateRatesRequest();
    req.shipment = this.generateShipmentRequest(payload);
    return req;
  }

  private generateShipmentRequest(payload: CreateLabelPayload | CalculateRatesPayload): Shipment {
    const shipment = new Shipment();
    shipment.ship_from = this.mapper.map(payload.shipFrom, Address, AddressAfterShipModel);
    shipment.ship_from.state = getStateCodeISO2(payload.shipFrom.state);
    shipment.ship_from.country = getCountryCodeISO3(payload.shipFrom.country);
    shipment.ship_from.type = "residential";
    shipment.ship_to = this.mapper.map(payload.shipTo, Address, AddressAfterShipModel);
    shipment.ship_to.state = getStateCodeISO2(payload.shipTo.state);
    shipment.ship_to.country = getCountryCodeISO3(payload.shipTo.country);
    shipment.ship_to.type = "residential";
    const parcelItem = new Item("item");
    const parcel = new Parcel(payload.weight, payload.dimension, [parcelItem], "custom");
    shipment.parcels = [parcel];
    return shipment;
  }

  private getRequestBuilder(type: EApiUrlType): IRequestBuilder {
    return new AxiosRequestBuilder(type === EApiUrlType.Shipping ? this.options.apiUrl : this.options.trackingApiUrl)
      .setContentType("application/json")
      .addHeader("as-api-key", this.options.apiKey)
      .addOnErrorHook((err) => {
        this.logger.error(err, "AfterShip API Error");
        this.sentry.error(`AfterShip Error: ${err.message}`);
        throw AfterShipException.createFromAxiosError(err);
      });
  }
}
