import { RpcNotFoundException } from "./base";

export class CodeNotFoundException extends RpcNotFoundException {
  constructor(objectOrError?: string | object, description = "Code Not Found") {
    super(objectOrError, description);
  }
}
