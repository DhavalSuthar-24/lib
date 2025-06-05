import { AutoMap } from "@automapper/classes";

export class TaxRate {
  @AutoMap()
  zip: string;

  @AutoMap()
  state: string;

  @AutoMap()
  stateRate: string;

  @AutoMap()
  county: string;

  @AutoMap()
  countyRate: string;

  @AutoMap()
  city: string;

  @AutoMap()
  cityRate: string;

  @AutoMap()
  combinedDistrictRate: string;

  @AutoMap()
  combinedRate: string;

  @AutoMap()
  freightTaxable: boolean;
}
