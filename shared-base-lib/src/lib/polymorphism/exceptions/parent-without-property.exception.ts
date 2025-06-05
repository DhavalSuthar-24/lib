import { RpcInternalServerErrorException } from "../../exceptions";

export class ParentWithoutPropertyException extends RpcInternalServerErrorException {
  constructor(objectOrError?: string | object, description = "Parent Without Property") {
    super(objectOrError, description);
  }
}
