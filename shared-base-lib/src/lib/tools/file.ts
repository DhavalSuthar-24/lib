import "multer";
import { Buffer } from "buffer";
import { AllowedMimeTypes } from "../types";
import { isNilOrEmpty, slice } from "@bit-core-api/shared-utils-lib";
import { HttpException, HttpStatus } from "@nestjs/common";

export type File = Express.Multer.File;

export const fileToByteArray = (file?: string | File): number[] | null => {
  if (isNilOrEmpty(file)) {
    return null;
  }
  const buff = typeof file === "string" ? Buffer.from(file, "base64") : file.buffer;
  return slice(buff);
};

export const byteArrayToBuffer = (byteArr: number[]): Buffer => {
  if (isNilOrEmpty(byteArr)) {
    return null;
  }
  return Buffer.from(byteArr);
};

export const fileToBuffer = (file?: string | File): Buffer => {
  if (isNilOrEmpty(file)) {
    return null;
  }
  const byteArr = fileToByteArray(file);
  return byteArrayToBuffer(byteArr);
};

export const fileTypesFilter = (
  file: File,
  types: AllowedMimeTypes[],
  callback: (error: Error | null, acceptFile: boolean) => void,
): void => {
  if (types.includes(file.mimetype as AllowedMimeTypes)) {
    callback(null, true);
    return;
  }
  //  TODO: RpcBadRequestException
  //  TODO: with rpcException client got 500 error
  callback(new HttpException(`Unsupported file type ${file.originalname}`, HttpStatus.BAD_REQUEST), false);
};
