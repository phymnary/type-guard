import { primative } from "@/types";
import { FieldValidatorBuilder } from "@/validators";

export type SchemaValidator<TSchema extends object> = {
  [id: primative]: FieldValidatorBuilder<TSchema, unknown>;
};

export function createSchema<U extends object, T extends SchemaValidator<U>>(
  blueprint: T
) {}
