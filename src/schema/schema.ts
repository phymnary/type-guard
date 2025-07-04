import { ValidateOptions } from "../type";

export const defaultOptions: ValidateOptions = {
  verbose: false,
  stopOnFirstError: false,
} as const;

export function createSchema() {}
