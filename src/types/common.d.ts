export type FirstClassJsType =
  | "undefined"
  | "object"
  | "boolean"
  | "number"
  | "bigint"
  | "string"
  | "symbol"
  | "function";

export type primative = string | number | symbol;

export type Dictionary = Record<primative, unknown>;

export type Uuid = `${string}-${string}-${string}-${string}-${string}`;
