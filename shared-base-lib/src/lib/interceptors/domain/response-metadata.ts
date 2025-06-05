export class ResoponseMetadata<T> {
  requestId: string;
  timestamp: string;
  retryAfter?: number;
  throttleInfo?: T;
}
