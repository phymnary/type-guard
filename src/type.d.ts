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

type Obj = Record<primative, unknown>;

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

export type ErrorDetails = {
  message?: string;
  metadata?: unknown;
};

export type ValidateResult = (ValidateError & ErrorDetails) | undefined;

export type ValidateFn<T> =
  | ((value: T) => ValidateError | undefined)
  | ((value: T, options: ValidateOptions) => ValidateError | undefined);

export type Validator<TValue> = (
  value: TValue,
  options: ValidateOptions
) => ValidateResult;

type SchemaValidationErrorDetails<T extends object> = T extends (infer U extends
  object)[]
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
