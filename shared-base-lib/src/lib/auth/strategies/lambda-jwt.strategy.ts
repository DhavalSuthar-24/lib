import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { LAMBDA_STRATEGY } from "../constants";
import { BitAuthOptions } from "../options";

@Injectable()
export class LambdaJwtStrategy extends PassportStrategy(Strategy, LAMBDA_STRATEGY) {
  constructor(options: BitAuthOptions) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      algorithms: [options.algorithm],
      secretOrKey: options.secret,
    });
  }

  public validate(payload: unknown): unknown {
    return payload;
  }
}
