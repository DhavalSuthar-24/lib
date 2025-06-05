import { isArray, isObject } from "@bit-core-api/shared-utils-lib";
import { RpcException } from "@nestjs/microservices";
import { ErrorDetails, ResponseDetails } from "../../interceptors";

export class PublicBaseException extends RpcException {
  public readonly payload: string | Record<string, unknown>;
  public readonly status: number;
  public readonly type: string;
  public readonly details: ResponseDetails | undefined;
  public readonly errors: ErrorDetails[] | undefined;

  constructor(payload: string | Record<string, any>, status: number, errorType: string, errors?: ErrorDetails[] | undefined, details?: ResponseDetails | undefined) {
    super(payload);
    this.payload = payload;
    this.status = status;
    this.type = errorType ?? this.constructor.name;
    this.details = details;
    this.errors = errors;
  }

  public getStatus(): number {
    return this.status;
  }

  public getPayload(): string | Record<string, unknown> {
    return this.payload;
  }

  public getType(): string {
    return this.type;
  }

  public getDetails(): ResponseDetails | undefined {
    return this.details;
  }

  public override getError(): string | object {
    return {
      type: this.type,
      status: this.status,
      payload: this.payload,
      details: this.details,
      errors: this.errors,
    };
  }

  public static createPayload(objectOrError: object | string, description?: string, statusCode?: number): object {
    if (!objectOrError) {
      return { statusCode, message: description };
    }

    return isObject(objectOrError) && !isArray(objectOrError) ? (objectOrError as object) : { statusCode, message: objectOrError, error: description };
  }
}
