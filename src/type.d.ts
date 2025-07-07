export type FirstClassJsType =
  | "undefined"
  | "object"
  | "boolean"
  | "number"
  | "bigint"
  | "string"
  | "symbol"
  | "function";

type Obj = Record<string | number | symbol, unknown>;

/**
 * Validate options
 *
 * @member {boolean} verbose is used to extensive error logging, default false
 */
export type ValidateOptions = {
  verbose?: boolean;
  stopOnFirstError?: boolean;
};

export type ValidateError = {
  description: string;
  isSafeGuard?: boolean;
};

export type ErrorDetails<TMetadata extends object = never> = [
  TMetadata
] extends never
  ? { message?: string }
  : {
      message?: string;
      metadata: TMetadata;
    };

export type ValidateResult<TMetadata extends object | never> =
  | (ValidateError & ErrorDetails<TMetadata>)
  | undefined;

export type ValidateFn<T> =
  | ((value: T) => ValidateError | undefined)
  | ((value: T, options: ValidateOptions) => ValidateError | undefined);

export type Validator<TValue, TMetadata extends object = never> = (
  value: TValue,
  options: ValidateOptions
) => ValidateResult<TMetadata>;

type SchemaValidationErrorDetails<T extends object> =
  T extends (infer U extends object)[]
    ? { [id: number]: SchemaValidationErrorDetails<U> }
    : {
        [K in keyof T]?: T[K] extends Obj
          ? SchemaValidationErrorDetails<T[K]>
          : ValidateResult<T>;
      };

export type SchemaValidateResult<TValue extends object> =
  | {
      isValid: true;
    }
  | ({
      isValid: false;
    } & SchemaValidationErrorDetails<TValue>);
