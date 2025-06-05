import { CustomDecorator, SetMetadata } from "@nestjs/common";
import { ALLOW_ANONYMOUS_META } from "../constants";

export const AllowAnonymous = (): CustomDecorator => SetMetadata(ALLOW_ANONYMOUS_META, true);
