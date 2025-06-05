import { DebitCreditRequest, DebitCreditResponse, VoidResponse, RetrieveResponse } from "./domain";

export interface IBasePaylianceService {
  /**
   * @createDebitTransactionAsync
   * This transaction withdraws money from the customer's bank account.
   * For example, when you pay a bill online, the amount is debited from your account.
   */
  createDebitTransactionAsync(payload: DebitCreditRequest): Promise<DebitCreditResponse>;

  /**
   * @createCreditTransactionAsync
   * This transaction deposits money into the customer's bank account.
   * For example, when you receive your salary via direct deposit, the amount is credited to your account
   */
  createCreditTransactionAsync(payload: DebitCreditRequest): Promise<DebitCreditResponse>;

  /**
   * @retrieveTransactionAsync
   * This transaction retrieves the transaction details based on the unique transaction id and authorization id.
   */
  retrieveTransactionAsync(uniqueTranId: string, authorizationId: string): Promise<RetrieveResponse>;

  /**
   * @voidTransactionAsync
   * This transaction voids the transaction based on the authorization id.
   */
  voidTransactionAsync(authorizationId: number): Promise<VoidResponse>;
}
