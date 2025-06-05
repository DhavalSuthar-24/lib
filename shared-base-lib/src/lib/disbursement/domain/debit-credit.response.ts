import { AutoMap } from "@automapper/classes";

export class DebitCreditResponse {
  @AutoMap()
  public authorizationId: number;

  @AutoMap()
  public validationCode: number;

  @AutoMap()
  public successful: boolean;

  @AutoMap()
  public message: string;
}
