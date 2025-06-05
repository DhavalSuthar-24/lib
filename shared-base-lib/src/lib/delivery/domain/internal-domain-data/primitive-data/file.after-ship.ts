import { AutoMap } from "@automapper/classes";
import { EDeliveryFileType } from "../../index";

export class FileAfterShip {
  @AutoMap()
  public paper_size: string;

  @AutoMap()
  public url: string;

  @AutoMap(() => String)
  public file_type: EDeliveryFileType;
}
