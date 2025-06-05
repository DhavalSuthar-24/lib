import { RpcNotFoundException } from "../base";

export class UserNotFoundException extends RpcNotFoundException {
  constructor(objectOrError?: string | object, description = "User Not Found") {
    super(objectOrError, description);
  }
}
