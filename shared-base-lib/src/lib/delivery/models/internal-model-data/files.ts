import { AutoMap } from "@automapper/classes";
import { FileAfterShip } from "../../domain";

export class Files {
  @AutoMap(() => FileAfterShip)
  public label?: FileAfterShip;

  @AutoMap(() => FileAfterShip)
  public qr_code?: FileAfterShip;

  @AutoMap(() => FileAfterShip)
  public invoice?: FileAfterShip;

  @AutoMap(() => FileAfterShip)
  public customs_declaration?: FileAfterShip;

  @AutoMap(() => FileAfterShip)
  public manifest?: FileAfterShip;
}
