import { RpcInternalServerErrorException } from "../exceptions";

export class QldbException extends RpcInternalServerErrorException {
  constructor(objectOrError?: string | object, description = "Qldb Error") {
    super(objectOrError, description);
  }
}
