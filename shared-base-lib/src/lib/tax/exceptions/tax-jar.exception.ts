import { AxiosError } from "axios";
import { HttpStatus } from "@nestjs/common";
import { isNil } from "@bit-core-api/shared-utils-lib";
import { RpcBaseException } from "@bit-core-api/shared-base-lib";

export class TaxJarException extends RpcBaseException {
  constructor(objectOrError?: string | object, description = "TaxJar Error", status = HttpStatus.INTERNAL_SERVER_ERROR) {
    super(RpcBaseException.createPayload(objectOrError, description, status), status);
  }

  public static createFromAxiosError(error: AxiosError): TaxJarException {
    if (!isNil(error)) {
      return new TaxJarException(error?.response?.data["detail"] as object, "TaxJar Error", error?.response?.status);
    }
    return new TaxJarException("Internal Server Error");
  }
}
