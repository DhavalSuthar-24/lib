import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { BIT_HEADER, BIT_STRATEGY } from "../constants";
import { BitAuthOptions } from "../options";
import { IIdentity } from "../identity";

@Injectable()
export class BitJwtStrategy extends PassportStrategy(Strategy, BIT_STRATEGY) {
  constructor(options: BitAuthOptions) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromHeader(BIT_HEADER.toLowerCase()),
        ExtractJwt.fromUrlQueryParameter(options.queryParamName),
      ]),
      audience: options.audience,
      issuer: options.issuer,
      algorithms: [options.algorithm],
      secretOrKey: options.secret,
    });
  }

  public validate(payload: IIdentity): IIdentity {
    return payload;
  }
}
