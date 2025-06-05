import { isNilOrEmpty, removeSpaces, values, includes } from "@bit-core-api/shared-utils-lib";
import { CodeNotFoundException } from "../exceptions";
import { EStateCodeIso2 } from "../types";

const STATE_CODE_LENGTH = 2;

export const getStateCodeISO2 = (state: string): EStateCodeIso2 => {
  if (state.length === STATE_CODE_LENGTH && includes(values(EStateCodeIso2), state.toUpperCase())) {
    return state.toUpperCase() as EStateCodeIso2;
  }
  const stateCode = EStateCodeIso2[removeSpaces(state)];
  if (isNilOrEmpty(stateCode)) {
    throw new CodeNotFoundException(`State code not found for state: ${state} in ISO-3166-2:US`);
  }
  return stateCode;
};
