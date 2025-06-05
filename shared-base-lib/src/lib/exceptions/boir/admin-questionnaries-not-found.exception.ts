import { RpcNotFoundException } from "../base";

export class AdminQuestionnaireNotFoundException extends RpcNotFoundException {
  constructor(errorOrObj?: string | object, description = "Admin questionnaire not found.") {
    super(errorOrObj, description);
  }
}
