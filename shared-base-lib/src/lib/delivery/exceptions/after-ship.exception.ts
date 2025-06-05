import { HttpStatus } from "@nestjs/common";
import { AxiosError } from "axios";
import { isNil, isNilOrEmpty } from "@bit-core-api/shared-utils-lib";
import { RpcBaseException } from "../../exceptions";

export class AfterShipException extends RpcBaseException {
  constructor(objectOrError?: string | object, description = "AfterShip Error", status = HttpStatus.INTERNAL_SERVER_ERROR) {
    super(RpcBaseException.createPayload(objectOrError, description, status), status);
  }

  public static createFromAxiosError(error: AxiosError): AfterShipException {
    if (!isNil(error)) {
      const errorData = (!isNilOrEmpty(error?.response?.data["meta"]) ? error?.response?.data["meta"]["message"] : error.message) as object;
      return new AfterShipException(errorData, "AfterShip Error", error?.response?.status);
    }
    return new AfterShipException("Internal Server Error");
  }
}
