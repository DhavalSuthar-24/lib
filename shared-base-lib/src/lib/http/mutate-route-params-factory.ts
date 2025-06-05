/* eslint-disable @typescript-eslint/no-explicit-any */
import { INestApplication } from "@nestjs/common";
import { RouteParamtypes } from "./route-paramtypes.enum";

// @nestjs/core lib (Oct 22, 2021; current: 9.0.0)
// IMPORTANT: If update of the @nestjs/common required please RouteParamsFactory
// GitHub: https://github.com/nestjs/nest/blob/v9.0.0/packages/core/router/route-params-factory.ts
// This function enables Model decorator usage and mutates RouteParamsFactory prototype
export const mutateRouteParamsFactory = (app: INestApplication): void => {
  const a = app as any;
  const routerExplorer = a?.middlewareModule?.routesMapper?.routerExplorer;
  const paramsFactory = routerExplorer?.executionContextCreator?.paramsFactory;
  if (paramsFactory) {
    paramsFactory.__proto__.defaultExchangeKeyForValue = paramsFactory.__proto__.exchangeKeyForValue;
    paramsFactory.__proto__.exchangeKeyForValue = (key, data, { req, res, next }): any => {
      if (key === RouteParamtypes.MODEL) {
        return { ...req.params, ...req.query, ...req.body };
      }
      return paramsFactory.__proto__.defaultExchangeKeyForValue.call(paramsFactory, key, data, { req, res, next });
    };
  }
};
