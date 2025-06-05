import { parseBool, isEmpty } from "@bit-core-api/shared-utils-lib";

export const useMocks = (name?: string): boolean =>
  isEmpty(name) ? parseBool(process.env.USE_MOCKS) : parseBool(process.env["USE_MOCKS_" + name]);
