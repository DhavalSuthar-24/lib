import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { isUUID } from "class-validator";
import { isNilOrEmpty, ZERO_UUID } from "@bit-core-api/shared-utils-lib";
import { RpcBadRequestException, RpcForbiddenException } from "../exceptions";
import { EUserType, IIdentity } from "../auth";

@Injectable()
export class CheckBlockByOrgMiddleware implements NestMiddleware {
  constructor(protected readonly jwtService: JwtService, @InjectPinoLogger(CheckBlockByOrgMiddleware.name) protected readonly logger: PinoLogger) {}

  public use(req: Request, res: Response, next: NextFunction): void {
    this.logger.info(`Executing Middleware "${CheckBlockByOrgMiddleware.name}"`);
    try {
      const bitToken = req.headers["bit-token"] as string;
      if (isNilOrEmpty(bitToken)) {
        next();
        return;
      }

      const identity = this.getIdentity(bitToken);
      const orgId = req.header("x-organization-id");
      this.validateOrgId(orgId);

      // TODO: add validation for admins, right now admins can access all orgs
      if (identity.userType === EUserType.Admin) {
        next();
        return;
      }

      // if end-user orgId === ZERO_UUID, it means that user doing request like individual
      if (orgId === ZERO_UUID) {
        next();
        return;
      }

      const userOrg = identity.roles?.orgs?.[orgId];
      if (isNilOrEmpty(userOrg)) {
        throw new RpcForbiddenException(`You don't have access to organization with orgId: ${orgId}`);
      }

      if (userOrg.blocked) {
        throw new RpcForbiddenException(`User is blocked for organization with orgId: ${orgId}`);
      }

      next();
    } catch (ex) {
      this.logger.error(ex);
      res.send({
        message: ex.error?.message || ex.message || "Internal server error",
        statusCode: ex.error?.statusCode || ex.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error: ex.error?.error ?? "Check Block Middleware Error",
      });
    }
  }

  private getIdentity(bitToken: string): IIdentity {
    const token = bitToken?.toString().replace("Bearer ", "");
    return this.jwtService.decode(token) as IIdentity;
  }

  private validateOrgId(orgId: string): void {
    if (isNilOrEmpty(orgId)) {
      throw new RpcBadRequestException("Header 'x-organization-id' is required.");
    }
    if (!isUUID(orgId)) {
      throw new RpcBadRequestException(`Header 'x-organization-id' must be UUID.`);
    }
  }
}
