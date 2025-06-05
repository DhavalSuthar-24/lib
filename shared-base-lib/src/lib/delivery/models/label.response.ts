import { AutoMap } from "@automapper/classes";
import { Label, Meta } from "./internal-model-data";

export class LabelResponse {
  @AutoMap(() => Meta)
  public meta: Meta;

  @AutoMap(() => Label)
  public data: Label;
}
