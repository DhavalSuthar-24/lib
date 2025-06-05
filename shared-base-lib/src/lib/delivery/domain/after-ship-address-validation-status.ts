import { AutoMap } from "@automapper/classes";

export class AfterShipAddressValidationStatus {
  @AutoMap()
  public isValid: boolean;

  @AutoMap()
  public message: string;

  constructor(isValid: boolean, message: string) {
    this.isValid = isValid;
    this.message = message;
  }
}
