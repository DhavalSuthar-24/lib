import { CustomDecorator, SetMetadata } from "@nestjs/common";
import { BIT_ROLES_META } from "../constants";
import { ERole } from "../identity";

export const Roles = (...roles: ERole[]): CustomDecorator => SetMetadata(BIT_ROLES_META, roles);
