import { RpcNotFoundException } from "@bit-core-api/shared-base-lib";

export class PaymentHandleNotFoundException extends RpcNotFoundException {
  constructor(objectOrError?: string | object, description = "Payment Handle not found") {
    super(objectOrError, description);
  }
}
