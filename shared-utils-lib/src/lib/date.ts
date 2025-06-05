import { first, isInteger, parseInt } from "lodash";
import { isNilOrEmpty } from "./any";

const ADJ_SUN_MON = 6;

export const parseDate = (str?: string, defVal?: Date): Date => {
  const date = str as unknown as Date;
  if (date instanceof Date) {
    return date;
  }

  const t = typeof str === "string" ? new Date(str) : defVal;

  return t;
};

export const parseTimestamp = (str: string, defVal?: Date): Date => {
  if (isNilOrEmpty(str)) {
    return defVal;
  }
  const timestamp = parseInt(str);
  return isInteger(timestamp) ? new Date(timestamp) : defVal;
};

export const stringIsDate = (value: string): boolean => /^((?:(\d{4}-\d{2}-\d{2})(T(\d{2}:\d{2}:\d{2}(?:\.\d+)?))?)(Z|[+-]\d{2}:\d{2})?)$/.test(value) && isNaN(Date.parse(value));

export const startOfWeek = (date: Date): Date => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -ADJ_SUN_MON : 1);
  const res = new Date(date);
  res.setDate(diff);
  return res;
};

export const endOfWeek = (date: Date): Date => {
  const days = startOfWeek(date).getDate();
  const res = new Date(date);
  res.setDate(days + ADJ_SUN_MON);
  return res;
};

export const startOfMonth = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), 1);

export const endOfMonth = (date: Date): Date => new Date(new Date(date.getFullYear(), date.getMonth() + 1, 1).getTime() - 1);

export const startOfYear = (date: Date): Date => new Date(date.getFullYear(), 0, 1);

export const endOfYear = (date: Date): Date => new Date(new Date(date.getFullYear() + 1, 0, 1).getTime() - 1);

export const toDateString = (date: Date): string => first(date.toISOString().split("T"));

export const endDate = (date: Date) => new Date(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).getTime() - 1);

export const nextDay = (date: Date) => new Date(date.setDate(date.getDate() + 1));
