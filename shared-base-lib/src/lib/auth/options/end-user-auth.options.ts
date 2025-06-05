import { Injectable } from "@nestjs/common";
import { ExternalAuthOptions } from "./external-auth.options";

@Injectable()
export class EndUserAuthOptions extends ExternalAuthOptions {}