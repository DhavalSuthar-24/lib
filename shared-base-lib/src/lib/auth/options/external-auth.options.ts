const JWKS_REQUESTS_PER_MIN = 5;
const ACCESS_TOKEN_QUERY_NAME = 'access_token';
const SIGN_ALG = 'RS256';

export abstract class ExternalAuthOptions {
  public audience: string;
  public issuer: string;
  public keysUrl: string;
  public algorithms: string[];
  public keysRequestsPerMinute: number;
  public queryParamName: string;

  constructor(
    audience: string,
    issuer: string,
    keysUrl: string,
    algorithms: string[] = [SIGN_ALG],
    keysRequestsPerMinute: number = JWKS_REQUESTS_PER_MIN,
    queryParamName: string = ACCESS_TOKEN_QUERY_NAME,
  ) {
    this.audience = audience;
    this.issuer = issuer;
    this.keysUrl = keysUrl;
    this.algorithms = algorithms;
    this.keysRequestsPerMinute = keysRequestsPerMinute;
    this.queryParamName = queryParamName;
  }
}
