import { RpcInternalServerErrorException } from "../../exceptions";

export class CryptoKeyManagementException extends RpcInternalServerErrorException {
  constructor(objectOrError?: string | object, description = "S3 Error") {
    super(objectOrError, description);
  }
}
