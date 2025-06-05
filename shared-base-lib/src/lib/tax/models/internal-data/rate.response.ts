import { AutoMap } from "@automapper/classes";

export class RateResponse {
  @AutoMap()
  zip: string;

  @AutoMap()
  state: string;

  @AutoMap()
  state_rate: string;

  @AutoMap()
  county: string;

  @AutoMap()
  county_rate: string;

  @AutoMap()
  city: string;

  @AutoMap()
  city_rate: string;

  @AutoMap()
  combined_district_rate: string;

  @AutoMap()
  combined_rate: string;

  @AutoMap()
  freight_taxable: boolean;
}
