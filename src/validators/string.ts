import { createBuilder } from "./builder";
import type { ValidateFn } from "./types";

const validateString: ValidateFn<string> = (value) => {
  if (typeof value === "string") return;

  return {
    description: `expected a string, received ${typeof value}`,
    isSafeGuard: true,
  };
};

export const string = createBuilder(validateString);

const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-8][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const validateUuid: ValidateFn<string> = (value) => {
  if (value.match(uuidRegex)) return;

  return {
    description: `expected an UUID`,
  };
};

export const uuid = validateUuid;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmail: ValidateFn<string> = (value) => {
  if (value.match(emailRegex)) return;

  return {
    description: `expected an email`,
  };
};

export const email = validateEmail;
