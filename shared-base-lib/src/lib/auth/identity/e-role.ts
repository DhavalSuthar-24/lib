import { reduce, roundToTens } from "@bit-core-api/shared-utils-lib";

export enum ERole {
  Super = "super_user",
  Admin = "admin_user",
  System = "system_user",
  Business = "business_user",
  Marketing = "marketing_user",
  CustSupport = "cust_support_user",
  Tech = "tech_support_user",
  Product = "product_user",
  Client = "client",
  Official = "official",
  Inspector = "inspector",
  Buyer = "buyer",
  Seller = "seller",
  FirstOrgUser = "first_org_user",
  Member = "member",
  Beneficiary = "beneficiary",
}

const SUPER_RATE = 10000000;
const ADMIN_RATE = 100000;
const SYSTEM_RATE = 100000;
const BUSINESS_RATE = 10000;
const MARKETING_RATE = 10000;
const CSR_RATE = 1000;
const TECH_RATE = 1000;
const PRODUCT_RATE = 1000;
const FIRST_ORG_USER = 100;
const OFFICIAL_RATE = 10;
const CLIENT_RATE = 0;
const MEMBER_RATE = 0;
const BENEFICIARY_RATE = 0;

export const RoleRating = {
  [ERole.Super]: SUPER_RATE,
  [ERole.Admin]: ADMIN_RATE,
  [ERole.System]: SYSTEM_RATE,
  [ERole.Business]: BUSINESS_RATE,
  [ERole.Marketing]: MARKETING_RATE,
  [ERole.CustSupport]: CSR_RATE,
  [ERole.Tech]: TECH_RATE,
  [ERole.Product]: PRODUCT_RATE,
  [ERole.Official]: OFFICIAL_RATE,
  [ERole.Client]: CLIENT_RATE,
  [ERole.FirstOrgUser]: FIRST_ORG_USER,
  [ERole.Member]: MEMBER_RATE,
  [ERole.Beneficiary]: BENEFICIARY_RATE,
};

export const countRolesRating = (roles: ERole[]): number => roundToTens(reduce(roles, (acc, r) => acc + RoleRating[r], 0));
