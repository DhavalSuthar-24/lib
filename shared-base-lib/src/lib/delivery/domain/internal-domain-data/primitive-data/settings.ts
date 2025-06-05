import { AutoMap } from "@automapper/classes";

export class Settings {
  @AutoMap()
  public commercial_invoice_signature: string;

  @AutoMap()
  public commercial_invoice_letterhead: string;
}
