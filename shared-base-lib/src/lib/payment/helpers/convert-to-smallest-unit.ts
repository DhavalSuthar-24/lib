/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Big } from "big.js";
import { CurrencyExponents, ECurrencyCode } from "../domain";

export const convertToSmallestUnit = (amount: number, currencyCode: ECurrencyCode): number => {
  const exponent = CurrencyExponents[currencyCode];
  const bigAmount = new Big(amount);
  const factor = new Big(10).pow(exponent);
  return bigAmount.times(factor).toNumber();
};
