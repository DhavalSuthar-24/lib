import { RpcNotFoundException } from "../../exceptions";

export class CardNotFoundException extends RpcNotFoundException {
  constructor(objectOrError?: string | object, description = "Card Not Found") {
    super(objectOrError, description);
  }
}
