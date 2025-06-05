/* eslint-disable @typescript-eslint/prefer-enum-initializers */
// Enum from @nestjs/common lib (Oct 22, 2021; current: 9.0.0)
// IMPORTANT: If update of the @nestjs/common required please check this constants
// GitHub: https://github.com/nestjs/nest/blob/v9.0.0/packages/common/enums/route-paramtypes.enum.ts

export enum RouteParamtypes {
  REQUEST,
  RESPONSE,
  NEXT,
  BODY,
  QUERY,
  PARAM,
  HEADERS,
  SESSION,
  FILE,
  FILES,
  HOST,
  IP,
  MODEL, // Value for Model decorator
}
