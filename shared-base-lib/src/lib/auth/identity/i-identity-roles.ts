import { ERole } from "./e-role";
import { IIdentityOrganization } from "./i-identity-organization";

export interface IIdentityRoles {
  global: ERole[];
  get orgs(): IIdentityOrganization;
}
