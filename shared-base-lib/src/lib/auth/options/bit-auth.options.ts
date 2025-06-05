import { Injectable } from "@nestjs/common";
import { BIT_ALG, BIT_AUDIENCE, BIT_ISSUER } from "../constants";

const BIT_TOKEN_QUERY_NAME = "bit_token";

@Injectable()
export class BitAuthOptions {
  public secret: string;
  public audience: string;
  public issuer: string;
  public algorithm: string;
  public queryParamName: string;

  constructor(
    secret: string,
    audience: string = BIT_AUDIENCE,
    issuer: string = BIT_ISSUER,
    algorithm: string = BIT_ALG,
    queryParamName: string = BIT_TOKEN_QUERY_NAME,
  ) {
    this.secret = secret;
    this.audience = audience;
    this.issuer = issuer;
    this.algorithm = algorithm;
    this.queryParamName = queryParamName;
  }
}
