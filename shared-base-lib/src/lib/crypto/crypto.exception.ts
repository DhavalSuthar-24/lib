import { RpcInternalServerErrorException } from "../exceptions";

export class CryptoException extends RpcInternalServerErrorException {
  constructor(objectOrError?: string | object, description = "Crypto Exception") {
    super(objectOrError, description);
  }
}
