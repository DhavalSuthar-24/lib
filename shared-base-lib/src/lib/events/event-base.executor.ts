import { Mapper } from "@automapper/core";
import { PinoLogger } from "nestjs-pino";
import { CqrsMediator, CQType } from "../cqrs";
import { EventAsyncType, EventBase, EventSyncType } from "./event-base";
import { isNilOrEmpty, omit } from "@bit-core-api/shared-utils-lib";

export abstract class EventBaseExecutor {
  constructor(protected readonly mediator: CqrsMediator, protected readonly mapper: Mapper, protected readonly logger: PinoLogger) {}

  protected async makeSync<TRes = any>(eventSync: EventSyncType, cqType: CQType, message: EventBase, excludeFromLogs?: string[]): Promise<TRes> {
    try {
      this.logger.info(`Message Received "${eventSync.name}"`);
      this.logger.debug(isNilOrEmpty(excludeFromLogs) ? message : omit(message, excludeFromLogs), `Message Received "${eventSync.name}"`);
      const cq = this.mapper.map(message, eventSync, cqType);
      return await this.mediator.execute(cq);
    } catch (ex) {
      this.logger.error({ ex }, `Error processing "${eventSync.name}"`);
      throw ex;
    }
  }

  protected async makeAsync(eventSync: EventAsyncType, cqType: CQType, event: EventBase, excludeFromLogs?: string[]): Promise<void> {
    try {
      this.logger.info(`Event Received "${eventSync.name}"`);
      this.logger.debug(isNilOrEmpty(excludeFromLogs) ? event : omit(event, excludeFromLogs), `Event Received "${eventSync.name}"`);
      const cq = this.mapper.map(event, eventSync, cqType);
      await this.mediator.execute(cq);
    } catch (ex) {
      this.logger.error({ ex }, `Error processing "${eventSync.name}"`);
      throw ex;
    }
  }
}
