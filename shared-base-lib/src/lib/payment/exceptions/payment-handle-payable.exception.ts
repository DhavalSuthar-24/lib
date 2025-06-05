import { RpcBadRequestException } from "@bit-core-api/shared-base-lib";

export class PaymentHandlePayableException extends RpcBadRequestException {
  constructor(objectOrError?: string | object, description = "Payment Handle not payable") {
    super(objectOrError, description);
  }
}
