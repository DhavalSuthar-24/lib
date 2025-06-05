import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { END_USER_STRATEGY, EXTERN_USER_REQ_PROP } from '../constants';
import { EndUserAuthOptions } from '../options';

@Injectable()
export class EndUserJwtStrategy extends PassportStrategy(Strategy, END_USER_STRATEGY) {
  constructor(options: EndUserAuthOptions) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: options.keysRequestsPerMinute,
        jwksUri: options.keysUrl,
      }),

      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter(options.queryParamName),
      ]),
      audience: options.audience,
      issuer: options.issuer,
      algorithms: options.algorithms,
      property: EXTERN_USER_REQ_PROP,
    });
  }

  public validate(payload: unknown): unknown {
    return payload;
  }
}
