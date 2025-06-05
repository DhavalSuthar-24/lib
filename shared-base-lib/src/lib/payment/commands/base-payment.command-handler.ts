import { ICommandHandler } from "@nestjs/cqrs";
import { Big } from "big.js";
import { isNilOrEmpty } from "@bit-core-api/shared-utils-lib";
import { IBasePaysafeService } from "../i-base-paysafe.service";
import { CreateTaxOrderPayload, IBaseTaxJarService, TaxItem, TaxOrder } from "../../tax";
import {
  ECurrencyCode,
  EPaymentHandleTransactionStatus,
  EPaymentType,
  ETransactionStatus,
  ETransactionType,
  PaymentHandleRequest,
  PaymentHandleResponse,
  ProcessPaymentRequest,
  ProcessSettlementRequest,
  SettlementResponse,
  TransactionResponse,
} from "../domain";
import { PaymentHandleNotFoundException, PaymentHandlePayableException } from "../exceptions";
import { Address } from "../../types";

export abstract class BasePaymentCommandHandler<TCommand, TRes> implements ICommandHandler<TCommand, TRes> {
  protected constructor(protected readonly paymentService: IBasePaysafeService, protected readonly taxService?: IBaseTaxJarService) {}

  public abstract execute(command: TCommand): Promise<TRes>;

  protected async processPaymentAsync(merchantRefNum: string, paymentHandleToken: string, amountPaysafe: string, settleWithAuth = true): Promise<TransactionResponse> {
    const paymentPayload = new ProcessPaymentRequest(merchantRefNum, Big(amountPaysafe).toNumber(), ECurrencyCode.USD, paymentHandleToken, settleWithAuth);
    return await this.paymentService.processPaymentAsync(paymentPayload);
  }

  protected async createTaxOrderAsync(
    shipTo: Address,
    amount: number,
    shippingCost: number,
    salesTax: number,
    txnDate: Date,
    transactionId: string,
    shipFrom?: Address,
    taxCode?: string,
  ): Promise<TaxOrder> {
    const taxOrderPayload = new CreateTaxOrderPayload();
    const taxItems = new TaxItem(Big(amount).minus(shippingCost).toNumber(), taxCode, 1, Big(salesTax).toNumber());
    taxOrderPayload.lineItems = [taxItems];
    taxOrderPayload.amount = amount;
    taxOrderPayload.shipping = shippingCost;
    taxOrderPayload.salesTax = salesTax;
    taxOrderPayload.transactionDate = txnDate;
    taxOrderPayload.transactionId = transactionId;
    taxOrderPayload.toCountry = shipTo.country;
    taxOrderPayload.toState = shipTo.state;
    taxOrderPayload.toZip = shipTo.zip;
    taxOrderPayload.toCity = shipTo.city;
    taxOrderPayload.toStreet = shipTo.address;
    if (!isNilOrEmpty(shipFrom)) {
      taxOrderPayload.fromCountry = shipFrom.country;
      taxOrderPayload.fromState = shipFrom.state;
      taxOrderPayload.fromZip = shipFrom.zip;
      taxOrderPayload.fromCity = shipFrom.city;
      taxOrderPayload.fromStreet = shipFrom.address;
    }
    return await this.taxService.createOrderTransactionAsync(taxOrderPayload);
  }

  protected async createSettlementAsync(merchantRefNum: string, transactionId: string, amountPaysafe: number): Promise<SettlementResponse> {
    const settlementPayload = new ProcessSettlementRequest(merchantRefNum, amountPaysafe);
    return await this.paymentService.processSettlementAsync(transactionId, settlementPayload);
  }

  protected async cancelPaymentAndTaxAsync(txnRes?: TransactionResponse, taxOrder?: TaxOrder, settlement?: SettlementResponse): Promise<void> {
    if (txnRes?.status === ETransactionStatus.Completed && txnRes?.paymentType === EPaymentType.Card && !isNilOrEmpty(settlement?.id)) {
      await this.paymentService.cancelSettlementAsync(settlement.id);
    }
    if (txnRes?.status === ETransactionStatus.Completed && txnRes?.paymentType !== EPaymentType.Card) {
      const paymentHandle = new PaymentHandleRequest();
      paymentHandle.transactionType = ETransactionType.StandaloneCredit;
      paymentHandle.paymentType = txnRes.paymentType;
      paymentHandle.amount = Big(txnRes.amount).toNumber();
      await this.paymentService.initStandaloneCreditAsync(paymentHandle, txnRes.gatewayResponse?.profile?.email);
    }
    if (!isNilOrEmpty(taxOrder?.transactionId)) {
      await this.taxService.deleteTaxOrderByIdAsync(taxOrder.transactionId);
    }
  }

  protected async validatePaymentHandleAsync(merchantRefNum: string): Promise<PaymentHandleResponse> {
    const paymentHandle = await this.paymentService.getPaymentHandleByMerchantRefNumAsync(merchantRefNum);
    if (isNilOrEmpty(paymentHandle)) {
      throw new PaymentHandleNotFoundException(`Payment handle not found for merchantRefNum: ${merchantRefNum}`);
    }
    if (paymentHandle.status !== EPaymentHandleTransactionStatus.Payable) {
      throw new PaymentHandlePayableException(`Payment handle is not payable for merchantRefNum: ${merchantRefNum}`);
    }
    return paymentHandle;
  }
}
