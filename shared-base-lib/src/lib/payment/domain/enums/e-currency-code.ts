/* eslint-disable @typescript-eslint/no-magic-numbers */
/**
  This 2 variables are used to convert FROM and TO the smallest unit of a currency.
 */
export const CurrencyExponents = {
  USD: 2, // US Dollar
  EUR: 2, // Euro
  GBP: 2, // British Pound
  // Add more currencies as needed, right now working with USD only
} as const;

export enum ECurrencyCode {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
  // Add more currencies as needed, right now working with USD only
}
