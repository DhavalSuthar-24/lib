import { fileTypesFilter, File } from "../tools";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request } from "express";
import { ALLOWED_PHOTO_MIME_TYPES } from "../constants";

export const PhotoInterceptor = FileInterceptor("file", {
  fileFilter(req: Request, file: File, callback: (error: Error | null, acceptFile: boolean) => void): void {
    fileTypesFilter(file, ALLOWED_PHOTO_MIME_TYPES, callback);
  },
});
