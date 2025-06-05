import { CustomDecorator, SetMetadata } from "@nestjs/common";
import { BIT_TYPE_META } from "../constants";
import { EUserType } from "../identity";

export const UserType = (...types: EUserType[]): CustomDecorator => SetMetadata(BIT_TYPE_META, types);