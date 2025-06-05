import * as objectId from "bson-objectid";

export const bsonId = (): string => objectId.default().toHexString();
