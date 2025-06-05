import { isNilOrEmpty } from "@bit-core-api/shared-utils-lib";
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { Observable, throwError } from "rxjs";
import { PublicBaseException, RpcBaseException, RpcInternalServerErrorException } from "../exceptions";

const EVENT_NAME_INDEX = 2;

@Catch()
export class PublicToRpcExceptionFilter<T = any, R = any> implements ExceptionFilter {
  constructor(@InjectPinoLogger(PublicToRpcExceptionFilter.name) private logger: PinoLogger) {}

  public catch(exception: T, _host: ArgumentsHost): Observable<R> {
    const rpcEx: RpcBaseException = exception instanceof RpcException ? this.normalizeRpcException(exception) : this.createRpcException(exception);
    const err = rpcEx.getError();

    // TODO: Need test for different exception types
    const eventName = _host.getArgByIndex(1)?.getArgByIndex(EVENT_NAME_INDEX);
    this.logger.error(err["payload"], `${!isNilOrEmpty(eventName) ? `eventName: ${eventName}` : "Unknown"}`);

    return throwError(() => err);
  }

  protected normalizeRpcException(exception: RpcException): RpcBaseException {
    return exception instanceof PublicBaseException
      ? new RpcBaseException(exception.payload, exception.status, exception.type)
      : exception instanceof RpcBaseException
      ? exception
      : new RpcInternalServerErrorException(exception.getError());
  }

  protected createRpcException(exception: T): RpcBaseException {
    if (exception instanceof HttpException) {
      return new RpcBaseException(exception.getResponse(), exception.getStatus(), exception.name);
    }
    this.logger.error(exception);
    if (exception instanceof Error && !isNilOrEmpty(exception.message)) {
      return new RpcInternalServerErrorException(exception.message);
    }
    return new RpcInternalServerErrorException(exception as any);
  }
}
