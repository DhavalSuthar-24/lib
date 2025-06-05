import { first, isArray, last, map, some } from "@bit-core-api/shared-utils-lib";
import { nanoid } from "nanoid";

const DEV_ID_SIZE = 5;

export const DEV_ACCOUNT_BIO_ID = "dev";

const DEV_ACCOUNTS = map(process.env?.DEV_ACCOUNTS?.split(",") ?? [], (x) => (x.includes("*") ? x.toLowerCase().split("*") : x.toLowerCase()));

export const isDevAccount = (email: string): boolean => {
  email = email.toLowerCase();
  return some(DEV_ACCOUNTS, (pattern) => (isArray(pattern) ? email.startsWith(first(pattern)) && email.endsWith(last(pattern)) : email === pattern));
};

export const generateDevBioId = (): string => "dev-" + nanoid(DEV_ID_SIZE);

export const generateId = (): string => nanoid(DEV_ID_SIZE);

export const isDevBioId = (bioId: string): boolean => bioId?.startsWith("dev-") ?? false;
