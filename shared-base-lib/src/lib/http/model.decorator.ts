import { isNil, isString } from "@bit-core-api/shared-utils-lib";
import { assignMetadata, PipeTransform, Type } from "@nestjs/common";
import { ROUTE_ARGS_METADATA } from "./constants";
import { RouteParamtypes } from "./route-paramtypes.enum";


const createPipesRouteParamDecorator =
  (paramtype: RouteParamtypes) =>
  (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any,
    ...pipes: (Type<PipeTransform> | PipeTransform)[]
  ): ParameterDecorator =>
  (target, key, index) => {
    const args =
      Reflect.getMetadata(ROUTE_ARGS_METADATA, target.constructor, key) || {};
    const hasParamData = isNil(data) || isString(data);
    const paramData = hasParamData ? data : undefined;
    const paramPipes = hasParamData ? pipes : [data, ...pipes];

    Reflect.defineMetadata(
      ROUTE_ARGS_METADATA,
      assignMetadata(args, paramtype, index, paramData, ...paramPipes),
      target.constructor,
      key,
    );
  };

// IMPORTANT: This decorator can work only after modifying prototype of RouteParamsFactory method exchangeKeyForValue
export function Model(
  property?: string | (Type<PipeTransform> | PipeTransform),
  ...pipes: (Type<PipeTransform> | PipeTransform)[]
): ParameterDecorator {
  return createPipesRouteParamDecorator(RouteParamtypes.MODEL)(
    property,
    ...pipes,
  );
}
