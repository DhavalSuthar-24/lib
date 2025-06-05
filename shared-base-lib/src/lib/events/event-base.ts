import { uuid } from "@bit-core-api/shared-utils-lib";
import { Type } from "@nestjs/common";
import { AutoMap } from "@automapper/classes";

export abstract class EventBase {
  @AutoMap()
  public tracingId: string;

  constructor() {
    this.tracingId = uuid();
  }
}

export interface EventSyncType extends Type<EventBase> {
  message: string;
}

export interface EventAsyncType extends Type<EventBase> {
  event: string;
}
