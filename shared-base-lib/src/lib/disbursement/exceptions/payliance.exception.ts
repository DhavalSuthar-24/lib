import { isNil } from "@bit-core-api/shared-utils-lib";
import { HttpStatus } from "@nestjs/common";
import { AxiosError } from "axios";
import { RpcBaseException } from "../../exceptions";

export class PaylianceException extends RpcBaseException {
  constructor(objectOrError?: string | object, description = "Payliance Error", status = HttpStatus.INTERNAL_SERVER_ERROR) {
    super(RpcBaseException.createPayload(objectOrError, description, status), status);
  }

  public static createFromAxiosError(error: AxiosError): PaylianceException {
    if (!isNil(error)) {
      return new PaylianceException(error?.response?.statusText, "Payliance Error", error?.response?.status);
    }
    return new PaylianceException("Internal Server Error");
  }
}
