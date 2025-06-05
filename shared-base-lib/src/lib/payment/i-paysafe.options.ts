export interface IPaysafeOptions {
  publicKey: string;
  apiKey: string;
  accountId: string;
  apiUrl: string;
  providerName?: string;
  publicProviderId?: string;
  googleMerchantId?: string;
  googleMerchantName?: string;
  paypalAccountId?: string;
  venmoAccountId?: string;
}

// As seen on this documentation: https://docs.paysafe.com/api/embedded-wallets/wallet/schemas/error-details
export interface IPaysafeErrorDetails {
  code: string;
  message: string;
  details?: string[];
  fieldErrors?: IPaysafeFieldError[];
}

export interface IPaysafeFieldError {
  field: string;
  error: string;
}
