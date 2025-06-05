import {
  AddressData,
  AuthorizationRequest,
  AuthorizationResponse,
  PaymentHandleResponse,
  PaysafeCard,
  PaysafeCredentials,
  ProcessPaymentRequest,
  ProcessSettlementRequest,
  Profile,
  SettlementResponse,
  SingleUseCustomerTokensResponse,
  TransactionResponse,
  PaymentHandleRequest,
  StandaloneCreditResponse,
  ProcessStandaloneCreditRequest,
} from "./domain";

export interface IBasePaysafeService {
  get publicKey(): string;
  get accountId(): string;
  get paypalAccountId(): string;
  get venmoAccountId(): string;
  get googleMerchantId(): string;
  get googleMerchantName(): string;
  get providerName(): string;
  get publicProviderId(): string;
  get credentials(): PaysafeCredentials;

  createPaymentHandleAsync(payload: PaymentHandleRequest, email?: string): Promise<PaymentHandleResponse>;
  getPaymentHandleByMerchantRefNumAsync(merchantRefNum: string): Promise<PaymentHandleResponse>;
  getPaymentHandleByIdAsync(paymentHandleId: string): Promise<PaymentHandleResponse>;

  getTransactionByIdAsync(transactionId: string): Promise<TransactionResponse>;
  getTransactionByMerchantRefNumAsync(merchantRefNum: string): Promise<TransactionResponse>;

  processPaymentAsync(payment: ProcessPaymentRequest): Promise<TransactionResponse>;
  authorizationAsync(payment: AuthorizationRequest): Promise<AuthorizationResponse>;

  processSettlementAsync(transactionId: string, payload: ProcessSettlementRequest): Promise<SettlementResponse>;
  getSettlementByIdAsync(settlementId: string): Promise<SettlementResponse>;
  cancelSettlementAsync(settlementId: string): Promise<SettlementResponse>;
  getSettlementByMerchantRefNumAsync(merchantRefNum: string): Promise<SettlementResponse>;

  createProfileAsync(profile: Profile): Promise<Profile>;
  getProfileByIdAsync(id: string): Promise<Profile>;
  getProfileByMerchantCustomerIdAsync(merchantCustomerId: string): Promise<Profile>;
  deleteProfileAsync(id: string): Promise<boolean>;

  addAddressAsync(profileId: string, address: AddressData): Promise<AddressData>;
  updateAddressAsync(profileId: string, address: AddressData): Promise<AddressData>;
  getAddressAsync(profileId: string, addressId: string): Promise<AddressData>;
  deleteAddressAsync(profileId: string, addressId: string): Promise<boolean>;

  addCardByTokenAsync(profileId: string, singleUseToken: string): Promise<PaysafeCard>;
  updateCardAsync(profileId: string, cardId: string, singleUseToken: string): Promise<PaysafeCard>;
  getCardAsync(profileId: string, cardId: string): Promise<PaysafeCard>;
  deleteCardAsync(profileId: string, cardId: string): Promise<boolean>;

  createSingleUseCustomerTokensAsync(profileId: string, merchantRefNum: string): Promise<SingleUseCustomerTokensResponse>;
  getSingleUseCustomerTokensAsync(id: string): Promise<SingleUseCustomerTokensResponse>;

  initStandaloneCreditAsync(payload: PaymentHandleRequest, consumerId?: string): Promise<StandaloneCreditResponse>;
  createStandaloneCreditAsync(payload: ProcessStandaloneCreditRequest): Promise<StandaloneCreditResponse>;
  getStandaloneCreditByIdAsync(standaloneCreditId: string): Promise<StandaloneCreditResponse>;
  getStandaloneCreditByMerchantRefNumAsync(merchantRefNum: string): Promise<StandaloneCreditResponse>;
}
