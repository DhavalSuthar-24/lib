import { uuid } from '@bit-core-api/shared-utils-lib';
import 'reflect-metadata';
import { QUERY_HANDLER_METADATA, QUERY_METADATA } from './constants';
import { QueryBase } from './query-base';

export const QueryHandlerStrict = (query: QueryBase): ClassDecorator => {
  return (target: object) => {
    if (!Reflect.hasOwnMetadata(QUERY_METADATA, query)) {
      Reflect.defineMetadata(QUERY_METADATA, { id: uuid() }, query);
    }
    Reflect.defineMetadata(QUERY_HANDLER_METADATA, query, target);
  }
}