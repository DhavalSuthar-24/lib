import { isNil } from "@bit-core-api/shared-utils-lib";
import { HttpStatus } from "@nestjs/common";
import { AxiosError } from "axios";
import { RpcBaseException } from "../../exceptions";

export class PaysafeException extends RpcBaseException {
  constructor(objectOrError?: string | object, description = "Paysafe Error", status = HttpStatus.INTERNAL_SERVER_ERROR) {
    super(RpcBaseException.createPayload(objectOrError, description, status), status);
  }

  public static createFromAxiosError(error: AxiosError): PaysafeException {
    if (!isNil(error)) {
      return new PaysafeException(error?.response?.data?.["error"]?.["message"] as object, "Paysafe Error", error?.response?.status);
    }
    return new PaysafeException("Internal Server Error");
  }
}
