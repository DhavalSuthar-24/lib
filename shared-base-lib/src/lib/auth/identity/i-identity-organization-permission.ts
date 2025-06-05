import { ERole } from "./e-role";
import { IEndUserOrg } from "./i-end-user-org";

export interface IIdentityOrganizationPermission {
  roles: ERole[];
  products: string[];
  blocked?: boolean;
  userOrg: IEndUserOrg;
}
