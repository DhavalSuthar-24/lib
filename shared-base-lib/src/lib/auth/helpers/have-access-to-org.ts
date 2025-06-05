import { includes, isNilOrEmpty, some } from "@bit-core-api/shared-utils-lib";
import { ERole, IIdentity } from "../identity";

export const haveAccessToOrg = (initiator: IIdentity, orgId: string, allowedRoles: ERole[] = [ERole.Super]): boolean => {
  const roles = initiator.roles;
  if (some(roles.global, (role: ERole) => includes(allowedRoles, role))) {
    return true;
  }
  const org = roles.orgs[orgId];
  if (isNilOrEmpty(org)) {
    return false;
  }
  return some(org.roles, (role: ERole) => includes(allowedRoles, role));
};
