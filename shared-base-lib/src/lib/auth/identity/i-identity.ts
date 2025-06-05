import { EUserStatus } from "./e-user-status";
import { EUserType } from "./e-user.type";
import { IIdentityRoles } from "./i-identity-roles";

export interface IIdentity {
  userId: string;
  externalId: string;
  userType: EUserType;
  email?: string;
  emailVerified: boolean;
  application?: string;
  mainProfileCompleted: boolean;
  profileCompleted?: boolean;
  biometricsVerified?: boolean;
  roles: IIdentityRoles;
  beingLevel?: number;
  status?: EUserStatus;
}
