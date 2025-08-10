import type { ValidateFn, FieldValidateResult } from "@/validators";

type TargetOrFunc<TParam, TReturn> = TReturn | ((param: TParam) => TReturn);

type SchemaValidator<TSchema, TValue> = (
  obj: TSchema,
  value: TValue
) => FieldValidateResult;

type Props<TSchema extends object, TValue, TMetadata extends object = never> = {
  validate: ValidateFn<TValue>;
  extensions: FieldValidatorBuilder<TSchema, TValue>[];
  condition?: (value: TSchema) => boolean;
  message?: TargetOrFunc<TSchema, string>;
  metadata?: TargetOrFunc<TSchema, TMetadata>;
};

function createValidatorBuilderCore<
  TSchema extends object,
  TValue,
  TMetadata extends object = never,
>(components: Props<TSchema, TValue, TMetadata>) {
  function withMessage(message: TargetOrFunc<TSchema, string>) {
    components.message = message;
    return createValidatorBuilderCore(components);
  }

  function withMetadata<TMetadata extends object>(
    metadata: TargetOrFunc<TSchema, TMetadata>
  ) {
    return createValidatorBuilderCore<TSchema, TValue, TMetadata>({
      ...components,
      metadata: metadata,
    });
  }

  function when(condition: (value: TSchema) => boolean) {
    components.condition = condition;
    return createValidatorBuilderCore(components);
  }

  function createFieldValidator(): SchemaValidator<TSchema, TValue>[] {
    const { validate, extensions, metadata, condition, message } = components;

    const base: SchemaValidator<TSchema, TValue> = (obj, value) => {
      if (condition?.(obj)) return;

      const error = validate(value);

      if (error)
        return {
          ...error,
          message: typeof message === "function" ? message(obj) : message,
          metadata: typeof metadata === "function" ? metadata(obj) : metadata,
        };
    };

    return [base, ...extensions.flatMap((ext) => ext.createFieldValidator())];
  }

  return {
    withMessage,
    withMetadata,
    when,
    createFieldValidator,
  };
}

export type FieldValidatorBuilder<TSchema extends object, TValue> = ReturnType<
  typeof createValidatorBuilderCore<TSchema, TValue>
>;

export type FieldValidatorBuilderFactory<TSchema extends object, TValue> = ((
  ...extensions: FieldValidatorBuilder<TSchema, TValue>[]
) => FieldValidatorBuilder<TSchema, TValue>) & { validate: ValidateFn<TValue> };

export function createBuilder<TSchema extends object, TValue>(
  validate: ValidateFn<TValue>
) {
  const fn: FieldValidatorBuilderFactory<TSchema, TValue> = (
    ...extensions: FieldValidatorBuilder<TSchema, TValue>[]
  ) =>
    createValidatorBuilderCore<TSchema, TValue>({
      validate,
      extensions,
    });

  fn.validate = validate;
  return fn;
}
