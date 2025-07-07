import {
  ValidateOptions,
  ValidateFn,
  ErrorDetails,
  SchemaValidateResult,
  ValidateResult,
} from "@/type";

type Props<TValue, TMetadata extends object = never> = {
  validate: ValidateFn<TValue>;
  extensions: ValidateFn<TValue>[];
  condition?: (value: TValue) => boolean;
} & ErrorDetails<TMetadata>;

function validatorBuilder<TValue, TMetadata extends object = never>(
  components: Props<TValue, TMetadata>
) {
  function withMessage(message: string) {
    components.message = message;
    return validatorBuilder(components);
  }

  function withMetadata<TSetMetadata extends {}>(metadata: TSetMetadata) {
    return validatorBuilder<TValue, TSetMetadata>({
      ...components,
      metadata: metadata,
    });
  }

  function when(condition: (value: TValue) => boolean) {
    components.condition = condition;
    return validatorBuilder(components);
  }

  function schemaBuild() {
    return function (
      value: TValue,
      options: ValidateOptions
    ): SchemaValidateResult<TValue> {
      const results: ValidateResult<TMetadata>[] = [];
    };
  }

  return {
    withMessage,
    withMetadata,
    when,
    schemaBuild,
  };
}

export function createBuilder<TValue>(validate: ValidateFn<TValue>) {
  const fn = (...extensions: ValidateFn<TValue>[]) =>
    validatorBuilder<TValue>({
      validate,
      extensions,
      metadata: undefined as never,
    });

  fn.validate = validate;
  return fn;
}
