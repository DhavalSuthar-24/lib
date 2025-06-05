import 'reflect-metadata';
import { COMMAND_HANDLER_METADATA, COMMAND_METADATA } from './constants';
import { CommandBase } from './command-base';
import { uuid } from '@bit-core-api/shared-utils-lib';

export const CommandHandlerStrict = (command: CommandBase): ClassDecorator => {
  return (target: object) => {
    if (!Reflect.hasOwnMetadata(COMMAND_METADATA, command)) {
      Reflect.defineMetadata(COMMAND_METADATA, { id: uuid() }, command);
    }
    Reflect.defineMetadata(COMMAND_HANDLER_METADATA, command, target);
  };
};