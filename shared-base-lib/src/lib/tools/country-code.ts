import { isNilOrEmpty, removeSpaces, includes, values, keys, find } from "@bit-core-api/shared-utils-lib";
import { CodeNotFoundException } from "../exceptions";
import { ECountryCodeIso2, ECountryCodeIso3 } from "../types";

const COUNTRY_CODE_ISO_2_LENGTH = 2;
const COUNTRY_CODE_ISO_3_LENGTH = 3;

export const getISO2KeyFromValue = (value: ECountryCodeIso2): string => {
  return find(keys(ECountryCodeIso2), (key) => ECountryCodeIso2[key] === value);
};

export const getISO3KeyFromValue = (value: ECountryCodeIso3): string => {
  return find(keys(ECountryCodeIso3), (key) => ECountryCodeIso3[key] === value);
};

export const getCountryCodeISO2 = (country: string): ECountryCodeIso2 => {
  if (country.length === COUNTRY_CODE_ISO_2_LENGTH && includes(values(ECountryCodeIso2), country.toUpperCase())) {
    return country.toUpperCase() as ECountryCodeIso2;
  }
  const countryCode = ECountryCodeIso2[removeSpaces(country)];
  if (isNilOrEmpty(countryCode)) {
    throw new CodeNotFoundException(`Country code not found for country: ${country} or not supported`);
  }
  return countryCode;
};

export const getCountryCodeISO3 = (country: string): ECountryCodeIso3 => {
  if (country.length === COUNTRY_CODE_ISO_3_LENGTH && includes(values(ECountryCodeIso3), country.toUpperCase())) {
    return country.toUpperCase() as ECountryCodeIso3;
  }
  const countryCode = ECountryCodeIso3[removeSpaces(country)];
  if (isNilOrEmpty(countryCode)) {
    throw new CodeNotFoundException(`Country code not found for country: ${country} or not supported`);
  }
  return countryCode;
};

export const getCountryCodeISO2FromISO3 = (country: string): ECountryCodeIso2 => {
  const countryCodeISO3 = getCountryCodeISO3(country);
  return ECountryCodeIso2[getISO3KeyFromValue(countryCodeISO3)] as ECountryCodeIso2;
};
