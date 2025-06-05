import { PinoLogger } from "nestjs-pino";
import { InjectSentry, SentryService } from "@ntegral/nestjs-sentry";
import { camelKeyTransform, pascalKeyTransform } from "@bit-core-api/shared-utils-lib";
import { AxiosRequestBuilder, EHttpMethod, IRequestBuilder } from "../http";
import { IPaylianceOptions } from "./i-payliance.options";
import { PaylianceException } from "./exceptions";
import { IBasePaylianceService } from "./i-base-payliance.service";
import { DebitCreditRequest, DebitCreditResponse, ESecCode, RetrieveResponse, VoidResponse } from "./domain";

export abstract class BasePaylianceService implements IBasePaylianceService {
  protected constructor(protected readonly options: IPaylianceOptions, protected readonly logger: PinoLogger, @InjectSentry() protected readonly sentry: SentryService) {}

  public async createDebitTransactionAsync(payload: DebitCreditRequest): Promise<DebitCreditResponse> {
    this.logger.debug(payload, "Executing Payliance - create debit transaction");
    payload.secCode = ESecCode.WEB;
    const request = pascalKeyTransform(payload);
    const builder = this.getRequestBuilder().setMethod(EHttpMethod.Post).setBody(request).setEndpoint("/echeck/debit").build<DebitCreditResponse>();
    const response = await builder.execute();
    const result = camelKeyTransform<DebitCreditResponse, DebitCreditResponse>(response);
    if (result.validationCode !== 1) {
      this.logger.error(result, "Payliance debit transaction error");
      throw new PaylianceException(result.message);
    }
    // TODO: add check for response status
    this.logger.debug(result, "Payliance debit transaction created result");
    return result;
  }

  public async createCreditTransactionAsync(payload: DebitCreditRequest): Promise<DebitCreditResponse> {
    this.logger.debug(payload, "Executing Payliance - create credit transaction");
    const request = pascalKeyTransform(payload);
    const builder = this.getRequestBuilder().setMethod(EHttpMethod.Post).setBody(request).setEndpoint("/echeck/credit").build<DebitCreditResponse>();
    const response = await builder.execute();
    const result = camelKeyTransform<DebitCreditResponse, DebitCreditResponse>(response);
    this.logger.debug(result, "Payliance credit transaction created result");
    return result;
  }

  public async retrieveTransactionAsync(uniqueTranId: string, authorizationId: string, includeRiskManagement = false): Promise<RetrieveResponse> {
    this.logger.debug({ uniqueTranId, authorizationId, includeRiskManagement }, "Executing Payliance - retrieve transaction");
    const builder = this.getRequestBuilder()
      .setEndpoint("/echeck/retrieve")
      .setMethod(EHttpMethod.Post)
      .setBody({
        UniqueTranId: uniqueTranId,
        AuthorizationId: authorizationId,
        IncludeRiskManagement: includeRiskManagement,
      })
      .build<RetrieveResponse>();
    const response = await builder.execute();
    const result = camelKeyTransform<RetrieveResponse, RetrieveResponse>(response);
    this.logger.debug(result, "Payliance retrieve transaction result");
    return result;
  }

  public async voidTransactionAsync(authorizationId: number): Promise<VoidResponse> {
    this.logger.debug({ authorizationId }, "Executing Payliance - void transaction");
    const builder = this.getRequestBuilder().setMethod(EHttpMethod.Post).setBody({ AuthorizationId: authorizationId }).setEndpoint("/echeck/void").build<VoidResponse>();
    const response = await builder.execute();
    this.logger.debug(response, "Payliance void transaction response");
    return response;
  }

  private getRequestBuilder(isAch = true): IRequestBuilder {
    return new AxiosRequestBuilder(this.options.apiUrl)
      .setContentType("application/json")
      .addHeader("Authorization", `Bearer ${isAch ? this.options.achApiKey : this.options.rtpApiKey}`)
      .addOnErrorHook((err) => {
        this.logger.error(err, "Payliance API Error");
        this.sentry.error(`Payliance Error: ${err.message}`);
        throw PaylianceException.createFromAxiosError(err);
      });
  }
}
