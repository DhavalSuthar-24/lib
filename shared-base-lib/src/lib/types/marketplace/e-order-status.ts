export enum EOrderStatus {
  Created = "CREATED",
  PaymentCompleted = "PAYMENT_COMPLETED",
  PaymentFailed = "PAYMENT_FAILED",
  Cancelled = "CANCELLED",
  OrderShipped = "ORDER_SHIPPED",
  OrderDelivered = "ORDER_DELIVERED",
  OwnershipTransferStarted = "OWNERSHIP_TRANSFER_STARTED",
  OwnershipTransferCompleted = "OWNERSHIP_TRANSFER_COMPLETED",
  OwnershipTransferFailed = "OWNERSHIP_TRANSFER_FAILED",
  OrderUndelivered = "ORDER_UNDELIVERED",
  OrderSuccess = "ORDER_SUCCESS",
  Return = "RETURN",
  ReturnShipped = "RETURN_SHIPPED",
  ReturnDelivered = "RETURN_DELIVERED",
  ReturnUndelivered = "RETURN_UNDELIVERED",
  Refund = "REFUND",
  RefundCompleted = "REFUND_COMPLETED",
  RefundFailed = "REFUND_FAILED",
}
