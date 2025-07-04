import { ValidateOptions, Validator, ValidatorComponents } from "../type";

function schemaBuilder<TValue, TMetadata extends object | void = void>(
  components: ValidatorComponents<TValue, TMetadata>
) {
  function withMessage(message: string) {
    components.message = message;
    return schemaBuilder(components);
  }

  function withMetadata<TSetMetadata extends {}>(metadata: TSetMetadata) {
    return schemaBuilder<TValue, TSetMetadata>({
      validator: components.validator,
      message: components.message,
      metadata: metadata,
    } as unknown as ValidatorComponents<TValue, TSetMetadata>);
  }

  function build() {
    return function (value: TValue, options: ValidateOptions) {};
  }

  return {
    withMessage,
    withMetadata,
    build,
  };
}

export function createBuilder<T>(validator: Validator<T>) {
  return schemaBuilder<T>({
    validator,
  });
}
