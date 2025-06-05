import { RpcInternalServerErrorException } from "../../exceptions";

export class ClassWithoutParentException extends RpcInternalServerErrorException {
  constructor(objectOrError?: string | object, description = "Class Without Parent") {
    super(objectOrError, description);
  }
}
