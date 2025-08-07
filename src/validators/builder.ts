import {
  ValidateOptions,
  ValidateFn,
  ErrorDetails,
  ValidateResult,
} from "@/type";

type Props<TSchema extends object, TValue> = {
  validate: ValidateFn<TValue>;
  extensions: ValidateFn<TValue>[];
  condition?: (value: TSchema) => boolean;
} & ErrorDetails;

function validatorBuilder<TSchema extends object, TValue>(
  components: Props<TSchema, TValue>
) {
  function withMessage(message: string) {
    components.message = message;
    return validatorBuilder(components);
  }

  function withMetadata<TMetadata extends object>(metadata: TMetadata) {
    return validatorBuilder<TSchema, TValue>({
      ...components,
      metadata: metadata,
    });
  }

  function when(condition: (value: TSchema) => boolean) {
    components.condition = condition;
    return validatorBuilder(components);
  }

  function createSchemaValidator() {
    return function (
      schema: TSchema,
      value: TValue,
      options: ValidateOptions
    ): ValidateResult {
      const { validate, extensions, metadata, condition, message } = components;
      const results: ValidateResult[] = [];

      if (condition?.(schema)) return;

      const validators = [validate, ...extensions];
      let i = 0;

      while (i < validate.length) {
        const result = validators[i](value, options);
        if (result) {
          results.push(result);
        }
      }
    };
  }

  return {
    withMessage,
    withMetadata,
    when,
    createSchemaValidator,
  };
}

export function createBuilder<TSchema extends object, TValue>(
  validate: ValidateFn<TValue>
) {
  const fn = (...extensions: ValidateFn<TValue>[]) =>
    validatorBuilder<TSchema, TValue>({
      validate,
      extensions,
      metadata: undefined as never,
    });

  fn.validate = validate;
  return fn;
}
