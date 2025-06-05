import { AutoMap } from "@automapper/classes";

export class MerchantDescriptor {
  @AutoMap()
  public dynamicDescriptor: string;

  @AutoMap()
  public phone: string;
}
