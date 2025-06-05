/* eslint-disable @typescript-eslint/no-magic-numbers */
import { CurrencyExponents, ECurrencyCode } from "../domain";

export const convertFromSmallestUnit = (amountInSmallestUnit: number, currencyCode: ECurrencyCode): number => {
  const exponent = CurrencyExponents[currencyCode];
  return amountInSmallestUnit / Math.pow(10, exponent);
};
