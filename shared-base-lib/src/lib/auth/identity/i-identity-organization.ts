import { IIdentityOrganizationPermission } from "./i-identity-organization-permission";

export interface IIdentityOrganization {
  [orgId: string]: IIdentityOrganizationPermission;
}
