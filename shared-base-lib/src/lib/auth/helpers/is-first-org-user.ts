import { ERole, IIdentity } from "../";
import { isNilOrEmpty, some } from "@bit-core-api/shared-utils-lib";

export const isFirstOrgUser = (identity: IIdentity, organizationId: string): boolean => {
  if (!isNilOrEmpty(organizationId)) {
    const organizationRoles = identity.roles?.orgs[organizationId];
    return some(organizationRoles?.roles, (role) => role === ERole.FirstOrgUser);
  }
  return false;
};
