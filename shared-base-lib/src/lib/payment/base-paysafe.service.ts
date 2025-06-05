import { Mapper } from "@automapper/core";
import { PinoLogger } from "nestjs-pino";
import { IPaysafeErrorDetails, IPaysafeFieldError, IPaysafeOptions } from "./i-paysafe.options";
import { PaysafeException } from "./exceptions";
import { first, forEach, isNilOrEmpty, uuid } from "@bit-core-api/shared-utils-lib";
import { IBasePaysafeService } from "./i-base-paysafe.service";
import {
  AddressData,
  AuthorizationRequest,
  AuthorizationResponse,
  ECardType,
  ECurrencyCode,
  ELocale,
  EPaymentHandleTransactionStatus,
  EPaymentType,
  ERecipientType,
  ETransactionStatus,
  ListPaymentHandlesResponse,
  ListSettlementsResponse,
  ListStandaloneCreditsResponse,
  ListTransactionsResponse,
  PaymentHandleRequest,
  PaymentHandleResponse,
  Paypal,
  PaysafeCard,
  PaysafeCredentials,
  ProcessPaymentRequest,
  ProcessSettlementRequest,
  ProcessStandaloneCreditRequest,
  Profile,
  SettlementResponse,
  SingleUseCustomerTokensResponse,
  StandaloneCreditResponse,
  TransactionResponse,
  Venmo,
} from "./domain";
import { AxiosRequestBuilder, EHttpMethod, IRequestBuilder } from "../http";
import { InjectSentry, SentryService } from "@ntegral/nestjs-sentry";

export abstract class BasePaysafeService implements IBasePaysafeService {
  protected constructor(
    protected readonly options: IPaysafeOptions,
    protected readonly mapper: Mapper,
    protected readonly logger: PinoLogger,
    @InjectSentry() protected readonly sentry: SentryService,
  ) {}

  public get publicKey(): string {
    return this.options.publicKey;
  }

  public get accountId(): string {
    return this.options.accountId;
  }

  public get paypalAccountId(): string {
    return this.options.paypalAccountId;
  }

  public get venmoAccountId(): string {
    return this.options.venmoAccountId;
  }

  public get googleMerchantId(): string {
    return this.options.googleMerchantId;
  }

  public get googleMerchantName(): string {
    return this.options.googleMerchantName;
  }

  public get providerName(): string {
    return this.options.providerName;
  }

  public get publicProviderId(): string {
    return this.options.publicProviderId;
  }

  public get credentials(): PaysafeCredentials {
    return new PaysafeCredentials(
      this.publicKey,
      this.accountId,
      this.paypalAccountId,
      this.venmoAccountId,
      this.googleMerchantId,
      this.googleMerchantName,
      this.providerName,
      this.publicProviderId,
    );
  }

  public async createProfileAsync(payload: Profile): Promise<Profile> {
    this.logger.debug(payload, "Executing Paysafe - create profile");
    payload.locale = ELocale.EnUs;
    const builder = this.getRequestBuilder().setMethod(EHttpMethod.Post).setBody(payload).setEndpoint("/customervault/v1/profiles").build<Profile>();
    const profile = await builder.execute();
    this.logger.debug(profile, "Paysafe profile created");
    return profile;
  }

  public async getProfileByIdAsync(id: string): Promise<Profile> {
    this.logger.debug(id, "Executing Paysafe - get profile by Id");
    const builder = this.getRequestBuilder().setMethod(EHttpMethod.Get).setEndpoint(`/customervault/v1/profiles/${id}`).build<Profile>();
    return await builder.execute();
  }

  public async getProfileByMerchantCustomerIdAsync(merchantCustomerId: string): Promise<Profile> {
    this.logger.debug(merchantCustomerId, "Executing Paysafe - get profile by merchant customer Id");
    const builder = this.getRequestBuilder()
      .setMethod(EHttpMethod.Get)
      .setEndpoint(`/customervault/v1/profiles`)
      .addQueryParam("merchantCustomerId", merchantCustomerId)
      .build<Profile>();
    return await builder.execute();
  }

  public async deleteProfileAsync(id: string): Promise<boolean> {
    this.logger.debug(id, "Executing Paysafe - delete profile by Id");
    const builder = this.getRequestBuilder().setMethod(EHttpMethod.Delete).setEndpoint(`/customervault/v1/profiles/${id}`).build<boolean>();
    await builder.execute();
    return true;
  }

  public async addAddressAsync(profileId: string, address: AddressData): Promise<AddressData> {
    this.logger.debug({ ...address, profileId }, "Executing Paysafe - add address");
    const builder = this.getRequestBuilder().setMethod(EHttpMethod.Post).setBody(address).setEndpoint(`/customervault/v1/profiles/${profileId}/addresses`).build<AddressData>();
    const result = await builder.execute();
    this.logger.debug(result, "Paysafe address created");
    return result;
  }

  public async updateAddressAsync(profileId: string, address: AddressData): Promise<AddressData> {
    this.logger.debug({ ...address, profileId }, "Executing Paysafe - update address");
    const builder = this.getRequestBuilder()
      .setMethod(EHttpMethod.Put)
      .setBody(address)
      .setEndpoint(`/customervault/v1/profiles/${profileId}/addresses/${address.id}`)
      .build<AddressData>();
    const result = await builder.execute();
    this.logger.debug(result, "Paysafe address updated");
    return result;
  }

  public async getAddressAsync(profileId: string, addressId: string): Promise<AddressData> {
    this.logger.debug({ profileId, addressId }, "Executing Paysafe - get address");
    const builder = this.getRequestBuilder().setMethod(EHttpMethod.Get).setEndpoint(`/customervault/v1/profiles/${profileId}/addresses/${addressId}`).build<AddressData>();
    return await builder.execute();
  }

  public async deleteAddressAsync(profileId: string, addressId: string): Promise<boolean> {
    this.logger.debug({ profileId, addressId }, "Executing Paysafe - delete address");
    const builder = this.getRequestBuilder().setMethod(EHttpMethod.Delete).setEndpoint(`/customervault/v1/profiles/${profileId}/addresses/${addressId}`).build<boolean>();
    await builder.execute();
    return true;
  }

  public async addCardByTokenAsync(profileId: string, singleUseToken: string): Promise<PaysafeCard> {
    this.logger.debug({ profileId, singleUseToken }, "Executing Paysafe - add card by token");
    const builder = this.getRequestBuilder()
      .setMethod(EHttpMethod.Post)
      .setBody({ singleUseToken, accountId: this.accountId })
      .setEndpoint(`/customervault/v1/profiles/${profileId}/cards`)
      .build<PaysafeCard>();
    const result = await builder.execute();
    this.logger.debug(result, "Paysafe card added");
    return result;
  }

  public async updateCardAsync(profileId: string, cardId: string, singleUseToken: string): Promise<PaysafeCard> {
    this.logger.debug({ profileId, cardId, singleUseToken }, "Executing Paysafe - update card");
    const builder = this.getRequestBuilder()
      .setMethod(EHttpMethod.Put)
      .setBody({ singleUseToken })
      .setEndpoint(`/customervault/v1/profiles/${profileId}/cards/${cardId}`)
      .build<PaysafeCard>();
    const result = await builder.execute();
    this.logger.debug(result, "Paysafe card updated");
    return result;
  }

  public async getCardAsync(profileId: string, cardId: string): Promise<PaysafeCard> {
    this.logger.debug({ profileId, cardId }, "Executing Paysafe - get card");
    const builder = this.getRequestBuilder().setMethod(EHttpMethod.Get).setEndpoint(`/customervault/v1/profiles/${profileId}/cards/${cardId}`).build<PaysafeCard>();
    return await builder.execute();
  }

  public async deleteCardAsync(profileId: string, cardId: string): Promise<boolean> {
    this.logger.debug({ profileId, cardId }, "Executing Paysafe - delete card");
    const builder = this.getRequestBuilder().setMethod(EHttpMethod.Delete).setEndpoint(`/customervault/v1/profiles/${profileId}/cards/${cardId}`).build<boolean>();
    await builder.execute();
    return true;
  }

  public async processPaymentAsync(payload: ProcessPaymentRequest): Promise<TransactionResponse> {
    this.logger.debug(payload, "Process payment started");
    const builder = this.getRequestBuilder().setMethod(EHttpMethod.Post).setBody(payload).setEndpoint("/paymenthub/v1/payments").build<TransactionResponse>();
    const response = await builder.execute();
    this.logger.debug(response, "Process payment finished");
    if (response.status !== ETransactionStatus.Completed) {
      throw new PaysafeException(`Transaction status is not ${ETransactionStatus.Completed}.`);
    }
    return response;
  }

  public async authorizationAsync(payload: AuthorizationRequest): Promise<AuthorizationResponse> {
    this.logger.debug(payload, "Payment Authorization started");
    const builder = this.getRequestBuilder()
      .setMethod(EHttpMethod.Post)
      .setBody(payload)
      .setEndpoint(`/cardpayments/v1/accounts/${this.accountId}/auths`)
      .build<AuthorizationResponse>();
    const response = await builder.execute();
    if (response.status !== ETransactionStatus.Completed) {
      throw new PaysafeException(`Transaction status is not ${ETransactionStatus.Completed}.`);
    }
    this.logger.debug(response, "Payment Authorization finished");
    return response;
  }

  public async getTransactionByMerchantRefNumAsync(merchantRefNum: string): Promise<TransactionResponse> {
    this.logger.debug({ merchantRefNum }, "Executing Paysafe - Get transaction by merchantRefNum");
    const builder = this.getRequestBuilder()
      .setMethod(EHttpMethod.Get)
      .setEndpoint(`/paymenthub/v1/payments`)
      .addQueryParam("merchantRefNum", merchantRefNum)
      .addParam("limit", 1)
      .build<ListTransactionsResponse>();
    const response = await builder.execute();
    if (response.payments.length === 0) {
      return null;
    }
    const result = first(response.payments);
    this.logger.debug(result, "Paysafe transaction found");
    return result;
  }

  public async getTransactionByIdAsync(transactionId: string): Promise<TransactionResponse> {
    this.logger.debug({ transactionId }, "Executing Paysafe - Get transaction by Id");
    const builder = this.getRequestBuilder().setMethod(EHttpMethod.Get).setEndpoint(`/paymenthub/v1/payments/${transactionId}`).build<TransactionResponse>();
    let result = await builder.execute();
    const paymentHandle = await this.getPaymentHandleByMerchantRefNumAsync(result.merchantRefNum);
    if (result.paymentType === EPaymentType.Card) {
      result = await this.determinePaymentTypeAsync(result, paymentHandle);
    }
    if (!isNilOrEmpty(paymentHandle.gatewayResponse)) {
      result.gatewayResponse = paymentHandle.gatewayResponse;
    }
    this.logger.debug(result, "Paysafe transaction found");
    return result;
  }

  public async createSingleUseCustomerTokensAsync(profileId: string, merchantRefNum: string): Promise<SingleUseCustomerTokensResponse> {
    this.logger.debug({ profileId, merchantRefNum }, "Executing Paysafe - Get customer single use tokens");
    const builder = this.getRequestBuilder()
      .setMethod(EHttpMethod.Post)
      .setEndpoint(`/paymenthub/v1/customers/${profileId}/singleusecustomertokens`)
      .setBody({ merchantRefNum, paymentType: [EPaymentType.Card] })
      .build<SingleUseCustomerTokensResponse>();
    const result = await builder.execute();
    this.logger.debug(result, "Paysafe customer single use tokens created");
    return result;
  }

  public async getSingleUseCustomerTokensAsync(id: string): Promise<SingleUseCustomerTokensResponse> {
    this.logger.debug({ id }, "Executing Paysafe - Get customer single use tokens");
    const builder = this.getRequestBuilder().setMethod(EHttpMethod.Get).setEndpoint(`/paymenthub/v1/singleusecustomertokens/${id}`).build<SingleUseCustomerTokensResponse>();
    const result = await builder.execute();
    this.logger.debug(result, "Paysafe customer single use tokens found");
    return result;
  }

  public async createPaymentHandleAsync(payload: PaymentHandleRequest, email?: string): Promise<PaymentHandleResponse> {
    this.logger.debug(payload, "Executing Paysafe - Create payment handle");
    payload.merchantRefNum ??= uuid();
    payload.currencyCode ??= ECurrencyCode.USD;
    if (payload.paymentType === EPaymentType.Paypal) {
      payload.paypal = new Paypal(email, ERecipientType.PayPalId);
    }
    if (payload.paymentType === EPaymentType.Venmo) {
      payload.venmo = new Venmo(email);
    }
    this.logger.debug(payload, "Executing Paysafe - Create payment handle (payload updated)");
    const builder = this.getRequestBuilder().setMethod(EHttpMethod.Post).setBody(payload).setEndpoint(`/paymenthub/v1/paymenthandles`).build<PaymentHandleResponse>();
    const response = await builder.execute();
    this.logger.debug(response, "Paysafe payment handle created");
    return response;
  }

  public async getPaymentHandleByMerchantRefNumAsync(merchantRefNum: string): Promise<PaymentHandleResponse> {
    this.logger.debug({ merchantRefNum }, "Executing Paysafe - Get payment handle by merchantRefNum");
    const builder = this.getRequestBuilder()
      .setMethod(EHttpMethod.Get)
      .setEndpoint(`/paymenthub/v1/paymenthandles`)
      .addQueryParam("merchantRefNum", merchantRefNum)
      .build<ListPaymentHandlesResponse>();
    const response = await builder.execute();
    if (response.paymentHandles.length === 0) {
      return null;
    }
    const result = first(response.paymentHandles);
    this.logger.debug(result, "Paysafe payment handle found");
    return result;
  }

  public async getPaymentHandleByIdAsync(paymentHandleId: string): Promise<PaymentHandleResponse> {
    this.logger.debug({ paymentHandleId }, "Executing Paysafe - Get payment handle by Id");
    const builder = this.getRequestBuilder().setMethod(EHttpMethod.Get).setEndpoint(`/paymenthub/v1/paymenthandles/${paymentHandleId}`).build<PaymentHandleResponse>();
    const result = await builder.execute();
    this.logger.debug(result, "Paysafe payment handle found");
    return result;
  }

  public async processSettlementAsync(transactionId: string, payload: ProcessSettlementRequest): Promise<SettlementResponse> {
    this.logger.debug({ ...payload, transactionId }, "Process settlement started");
    const builder = this.getRequestBuilder()
      .setMethod(EHttpMethod.Post)
      .setBody(payload)
      .setEndpoint(`/paymenthub/v1/payments/${transactionId}/settlements`)
      .build<SettlementResponse>();
    const response = await builder.execute();
    this.logger.debug(response, "Process settlement finished");
    return response;
  }

  public async getSettlementByIdAsync(settlementId: string): Promise<SettlementResponse> {
    this.logger.debug({ settlementId }, "Executing Paysafe - Get settlement by Id");
    const builder = this.getRequestBuilder().setMethod(EHttpMethod.Get).setEndpoint(`/paymenthub/v1/settlements/${settlementId}`).build<SettlementResponse>();
    const result = await builder.execute();
    this.logger.debug(result, "Paysafe settlement found");
    return;
  }

  public async cancelSettlementAsync(settlementId: string): Promise<SettlementResponse> {
    this.logger.debug({ settlementId }, "Executing Paysafe - Cancel settlement by Id");
    const builder = this.getRequestBuilder()
      .setMethod(EHttpMethod.Put)
      .setBody({ status: ETransactionStatus.Cancelled })
      .setEndpoint(`/paymenthub/v1/settlements/${settlementId}`)
      .build<SettlementResponse>();
    const result = await builder.execute();
    this.logger.debug(result, "Paysafe settlement cancelled");
    return result;
  }

  public async getSettlementByMerchantRefNumAsync(merchantRefNum: string): Promise<SettlementResponse> {
    this.logger.debug({ merchantRefNum }, "Executing Paysafe - Get settlement by merchantRefNum");
    const builder = this.getRequestBuilder()
      .setMethod(EHttpMethod.Get)
      .setEndpoint(`/paymenthub/v1/settlements`)
      .addQueryParam("merchantRefNum", merchantRefNum)
      .addParam("limit", 1)
      .build<ListSettlementsResponse>();
    const response = await builder.execute();
    if (response.settlements?.length === 0) {
      return null;
    }
    const result = first(response.settlements);
    this.logger.debug(result, "Paysafe settlement found");
    return result;
  }

  public async initStandaloneCreditAsync(payload: PaymentHandleRequest, consumerId?: string): Promise<StandaloneCreditResponse> {
    this.logger.debug(payload, "Executing Paysafe - Init standalone credit");
    const paymentHandle = await this.createPaymentHandleAsync(payload, consumerId);
    if (paymentHandle.status !== EPaymentHandleTransactionStatus.Payable) {
      throw new PaysafeException(`Init standalone credit error. Payment handle status is not ${EPaymentHandleTransactionStatus.Payable}.`);
    }
    const stcPayload = new ProcessStandaloneCreditRequest(paymentHandle.merchantRefNum, paymentHandle.amount, paymentHandle.currencyCode, paymentHandle.paymentHandleToken);
    return await this.createStandaloneCreditAsync(stcPayload);
  }

  public async createStandaloneCreditAsync(payload: ProcessStandaloneCreditRequest): Promise<StandaloneCreditResponse> {
    this.logger.debug(payload, "Executing Paysafe - Create standalone credit");
    const builder = this.getRequestBuilder().setMethod(EHttpMethod.Post).setBody(payload).setEndpoint("/paymenthub/v1/standalonecredits").build<StandaloneCreditResponse>();
    const response = await builder.execute();
    this.logger.debug(response, "Paysafe standalone credit created");
    return response;
  }

  public async getStandaloneCreditByIdAsync(standaloneCreditId: string): Promise<StandaloneCreditResponse> {
    this.logger.debug({ standaloneCreditId }, "Executing Paysafe - Get standalone credit by Id");
    const builder = this.getRequestBuilder().setMethod(EHttpMethod.Get).setEndpoint(`/paymenthub/v1/standalonecredits/${standaloneCreditId}`).build<StandaloneCreditResponse>();
    const result = await builder.execute();
    this.logger.debug(result, "Paysafe standalone credit found");
    return result;
  }

  public async getStandaloneCreditByMerchantRefNumAsync(merchantRefNum: string): Promise<StandaloneCreditResponse> {
    this.logger.debug({ merchantRefNum }, "Executing Paysafe - Get standalone credit by merchantRefNum");
    const builder = this.getRequestBuilder()
      .setMethod(EHttpMethod.Get)
      .setEndpoint(`/paymenthub/v1/standalonecredits`)
      .addQueryParam("merchantRefNum", merchantRefNum)
      .addParam("limit", 1)
      .build<ListStandaloneCreditsResponse>();
    const response = await builder.execute();
    if (response.standaloneCredits.length === 0) {
      return null;
    }
    const result = first(response.standaloneCredits);
    this.logger.debug(result, "Paysafe standalone credit found");
    return result;
  }

  private getRequestBuilder(): IRequestBuilder {
    return new AxiosRequestBuilder(this.options.apiUrl)
      .setContentType("application/json")
      .addHeader("Authorization", `Basic ${this.options.apiKey}`)
      .addOnErrorHook((err) => {
        const errorDetails: IPaysafeErrorDetails = err.response?.data?.error;

        this.logger.error(errorDetails, "Paysafe API Error");
        this.logger.error(errorDetails?.message, "Paysafe API Error Message");
        this.logger.error(errorDetails?.code, "Paysafe API Error Code");
        this.sentry.error(`Paysafe Error: ${errorDetails?.message}`);
        this.sentry.error(`Paysafe Error: ${errorDetails?.code}`);

        if (!isNilOrEmpty(errorDetails?.details) && errorDetails?.details.length > 0) {
          this.logger.error(errorDetails?.details, "Paysafe API Error Details");
          this.sentry.error(JSON.stringify(errorDetails?.details));
        }

        if (!isNilOrEmpty(errorDetails?.fieldErrors) && errorDetails?.fieldErrors?.length > 0) {
          forEach(errorDetails?.fieldErrors, (fieldError: IPaysafeFieldError) => {
            const fieldErrorDetails = {
              field: fieldError?.field,
              error: fieldError?.error,
            };
            this.logger.error(fieldErrorDetails, "Paysafe API Error Field Error");
            this.sentry.error(JSON.stringify(fieldErrorDetails));
          });
        }
        throw PaysafeException.createFromAxiosError(err);
      });
  }

  private async determinePaymentTypeAsync(payload: TransactionResponse, paymentHandle: PaymentHandleResponse): Promise<TransactionResponse> {
    if (!isNilOrEmpty(paymentHandle.applePay)) {
      payload.paymentType = EPaymentType.ApplePay;
      const cardNetWork = paymentHandle.applePay.applePayPaymentToken.token.paymentMethod.network;
      payload.card.cardType = ECardType[cardNetWork];
    }
    if (!isNilOrEmpty(paymentHandle.googlePay)) {
      payload.paymentType = EPaymentType.GooglePay;
    }
    return payload;
  }
}
