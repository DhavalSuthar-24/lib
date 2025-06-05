import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { PublicInternalServerErrorException } from "../exceptions";
import { Snowflake } from "../algorithms";
import { IDecodedIdResponse } from "../algorithms/domain";

@Injectable()
export class PublicRequestIdMiddleware implements NestMiddleware {
  private snowflake: Snowflake;
  constructor(@InjectPinoLogger(PublicRequestIdMiddleware.name) protected readonly logger?: PinoLogger) {
    this.snowflake = new Snowflake();
  }

  public use(req: Request, res: Response, next: NextFunction): void {
    this.logger.info(`Executing Middleware "${PublicRequestIdMiddleware.name}"`);
    if (req["requestId"]) {
      return next();
    }

    // Generate a new UUID and add it to the request object
    const requestId = this.generateRequestId();
    req["requestId"] = requestId;
    req["requestTime"] = Date.now();

    next();
  }

  private generateRequestId(): string {
    try {
      const requestId = this.snowflake.generateUniqueId();
      return requestId;
    } catch (error) {
      this.logger.error(error);
      throw new PublicInternalServerErrorException(error);
    }
  }

  private decodeRequestId(id: string): IDecodedIdResponse {
    try {
      const decodedData = this.snowflake.decodeId(id);
      return decodedData;
    } catch (error) {
      this.logger.error(error);
      throw new PublicInternalServerErrorException(error);
    }
  }
}
