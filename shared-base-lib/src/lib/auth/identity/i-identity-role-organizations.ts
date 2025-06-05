import { ERole } from "./e-role";

export interface IIdentityRoleOrganizations {
  [orgId: string]: ERole[];
}
