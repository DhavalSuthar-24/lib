import { AutoMap } from "@automapper/classes";
import { PaymentTokenWithCvv, BillingDetails } from "./internal-data";
import { PaymentRequest } from "./payment.request";

export class AuthorizationRequest extends PaymentRequest {
  @AutoMap(() => PaymentTokenWithCvv)
  public card: PaymentTokenWithCvv;

  @AutoMap(() => BillingDetails)
  public billingDetails: BillingDetails;
}
