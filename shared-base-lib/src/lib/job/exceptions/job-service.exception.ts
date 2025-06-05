import { RpcInternalServerErrorException } from "../../exceptions";

export class JobServiceException extends RpcInternalServerErrorException {
  constructor(objectOrError?: string | object, description = "Job Service Exception") {
    super(objectOrError, description);
  }
}
