import { AutoMap } from "@automapper/classes";
import { MetaResponse } from "./internal-data";
import { PaymentHandleResponse } from "./payment-handle.response";

export class ListPaymentHandlesResponse {
  @AutoMap(() => MetaResponse)
  public meta: MetaResponse;

  @AutoMap(() => [PaymentHandleResponse])
  public paymentHandles: PaymentHandleResponse[];
}
