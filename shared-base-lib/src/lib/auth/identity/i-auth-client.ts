export interface IAuthClient {
  clientId: string;
  accessTokenId:string
  scopes: string[];
  iat: number;
  exp: number;
}
