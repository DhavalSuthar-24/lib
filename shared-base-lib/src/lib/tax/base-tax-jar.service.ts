import { PinoLogger } from "nestjs-pino";
import { Mapper } from "@automapper/core";
import { InjectSentry, SentryService } from "@ntegral/nestjs-sentry";
import { camelKeyTransform, isNilOrEmpty, snakeKeyTransform } from "@bit-core-api/shared-utils-lib";
import { ITaxJarOptions } from "./i-tax-jar.options";
import { IBaseTaxJarService } from "./i-base-tax-jar.service";
import { AxiosRequestBuilder, EHttpMethod, IRequestBuilder } from "../http";
import {
  CalculateTaxRequest,
  CategoryResponse,
  ListTaxCategoryResponse,
  OrderResponse,
  RateResponse,
  Tax,
  TaxAddressesValidationRequest,
  TaxAddressesValidationResponse,
  TaxOrderResponse,
  TaxRateResponse,
  TaxResponse,
} from "./models";
import { CalculateTaxPayload, CreateTaxOrderPayload, SalesTax, TaxAddressValidationStatus, TaxCategory, TaxOrder, TaxRate } from "./domain";
import { TaxJarException } from "./exceptions";
import { Address } from "../types";
import { getCountryCodeISO2, getStateCodeISO2 } from "../tools";
import { normalizeField } from "./helpers";

export abstract class BaseTaxJarService implements IBaseTaxJarService {
  protected constructor(
    protected readonly options: ITaxJarOptions,
    protected readonly mapper: Mapper,
    protected readonly logger: PinoLogger,
    @InjectSentry() protected readonly sentry: SentryService,
  ) {}

  public async calculateTaxAsync(payload: CalculateTaxPayload): Promise<SalesTax> {
    this.logger.debug({ payload }, "Executing TaxJar - calculate tax");
    payload = this.normalizeRequest(payload);
    const request = snakeKeyTransform<CalculateTaxPayload, CalculateTaxRequest>(payload);
    this.logger.debug(request, "TaxJar - tax calculated request");
    const builder = this.getRequestBuilder().setMethod(EHttpMethod.Post).setBody(request).setEndpoint("/taxes").build<TaxResponse>();
    const res = await builder.execute();
    this.logger.debug(res, "TaxJar - tax calculated response");
    return camelKeyTransform<Tax, SalesTax>(res.tax);
  }

  public async createOrderTransactionAsync(payload: CreateTaxOrderPayload): Promise<TaxOrder> {
    this.logger.debug(payload, "Executing TaxJar - create order transaction");
    payload = this.normalizeRequest(payload) as CreateTaxOrderPayload;
    const request = snakeKeyTransform(payload);
    this.logger.debug(request, "TaxJar - create order transaction request");
    const builder = this.getRequestBuilder().setMethod(EHttpMethod.Post).setBody(request).setEndpoint("/transactions/orders").build<TaxOrderResponse>();
    const res = await builder.execute();
    this.logger.debug(res, "TaxJar - create order transaction response");
    return camelKeyTransform<OrderResponse, TaxOrder>(res.order);
  }

  public async getTaxOrderByIdAsync(orderId: string): Promise<TaxOrder> {
    this.logger.debug({ orderId }, "Executing TaxJar - get tax order by id");
    const builder = this.getRequestBuilder().setMethod(EHttpMethod.Get).setEndpoint(`/transactions/orders/${orderId}`).build<TaxOrderResponse>();
    const res = await builder.execute();
    this.logger.debug(res, "TaxJar - get tax order by id response");
    return camelKeyTransform<OrderResponse, TaxOrder>(res.order);
  }

  public async deleteTaxOrderByIdAsync(orderId: string): Promise<void> {
    this.logger.debug({ orderId }, "Executing TaxJar - delete tax order by id");
    const builder = this.getRequestBuilder().setMethod(EHttpMethod.Delete).setEndpoint(`/transactions/orders/${orderId}`).build();
    await builder.execute();
    this.logger.info(`TaxJar - tax order with id: ${orderId} deleted`);
  }

  public async listTaxCategoriesAsync(): Promise<TaxCategory[]> {
    this.logger.debug("Executing TaxJar - list tax categories");
    const builder = this.getRequestBuilder().setMethod(EHttpMethod.Get).setEndpoint("/categories").build<ListTaxCategoryResponse>();
    const res = await builder.execute();
    return this.mapper.mapArray(res.categories, CategoryResponse, TaxCategory);
  }

  public async validateAddressAsync(address: Address): Promise<TaxAddressValidationStatus> {
    this.logger.debug(address, "Executing TaxJar - validate address");
    const request = this.mapper.map(address, Address, TaxAddressesValidationRequest);
    request.country = getCountryCodeISO2(address.country);
    request.state = getStateCodeISO2(address.state);
    const builder = this.getRequestBuilder().setMethod(EHttpMethod.Post).setBody(request).setEndpoint(`/addresses/validate`).build<TaxAddressesValidationResponse>();
    const res = await builder.execute();
    this.logger.debug(res, "TaxJar validate address response");
    const isValid = !isNilOrEmpty(res.addresses);
    const message = isValid ? `Address matches count: ${res.addresses.length}` : "Address is invalid";
    return new TaxAddressValidationStatus(isValid, message);
  }

  public async getRatesByZipCodeAsync(zip: string): Promise<TaxRate> {
    this.logger.debug({ zip }, "Executing TaxJar - get tax rates by zip code");
    const builder = this.getRequestBuilder().setMethod(EHttpMethod.Get).setEndpoint(`/rates/${zip}`).build<TaxRateResponse>();
    const res = await builder.execute();
    this.logger.debug(res, "TaxJar - get tax order by id response");
    return camelKeyTransform<RateResponse, TaxRate>(res.rate);
  }

  private normalizeRequest(payload: CalculateTaxPayload | CreateTaxOrderPayload): CalculateTaxPayload | CreateTaxOrderPayload {
    payload.fromCountry = normalizeField(payload.fromCountry, getCountryCodeISO2);
    payload.toCountry = normalizeField(payload.toCountry, getCountryCodeISO2);
    payload.fromState = normalizeField(payload.fromState, getStateCodeISO2);
    payload.toState = normalizeField(payload.toState, getStateCodeISO2);
    return payload;
  }

  private getRequestBuilder(): IRequestBuilder {
    return new AxiosRequestBuilder(this.options.apiUrl)
      .setContentType("application/json")
      .addHeader("Authorization", `Bearer ${this.options.apiKey}`)
      .addOnErrorHook((err) => {
        this.logger.error(err, "TaxJar API Error");
        this.sentry.error(`TaxJar Error: ${err.message}`);
        throw TaxJarException.createFromAxiosError(err);
      });
  }
}
