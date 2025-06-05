import { IFlagSmithOptions } from "./i-flagsmith.options";

export class FlagSmithOptions implements IFlagSmithOptions {
  public apiUrl: string;
  public apiKey: string;

  constructor(apiUrl: string, apiKey: string) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }
}
