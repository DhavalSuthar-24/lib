import { CustomDecorator, SetMetadata } from "@nestjs/common";
import { APP_KEY } from "../constants";

export const ActiveSubscriptions = (...applications: string[]): CustomDecorator => SetMetadata(APP_KEY, applications);
