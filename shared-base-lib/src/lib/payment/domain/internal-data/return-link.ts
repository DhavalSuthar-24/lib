import { AutoMap } from "@automapper/classes";
import { EHttpMethod } from "../../../http";

export class ReturnLink {
  @AutoMap()
  public rel: string;

  @AutoMap()
  public href: string;

  @AutoMap(() => String)
  public method: EHttpMethod;

  constructor(rel: string, href: string, method = EHttpMethod.Get) {
    this.rel = rel;
    this.href = href;
    this.method = method;
  }
}
