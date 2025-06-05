import { AutoMap } from "@automapper/classes";

export class TaxAddressValidationStatus {
  @AutoMap()
  public isValid: boolean;

  @AutoMap()
  public message: string;

  constructor(isValid: boolean, message: string) {
    this.isValid = isValid;
    this.message = message;
  }

  public static valid(): TaxAddressValidationStatus {
    return new TaxAddressValidationStatus(true, "Develop and staging environments always return valid address validation status.");
  }
}
