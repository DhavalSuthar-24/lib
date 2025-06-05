export enum EDisbursementTransactionStatus {
  NotFound = 0,
  Invalidated = 1,
  Pending = 2,
  SentToBank = 4,
  Returned = 8,
  Settled = 16,
  SettledThenReturned = 24,
  Voided = 32,
}
