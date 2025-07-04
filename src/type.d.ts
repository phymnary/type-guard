export type FirstClassJsType =
  | "undefined"
  | "object"
  | "boolean"
  | "number"
  | "bigint"
  | "string"
  | "symbol"
  | "function";

export type ValidateError = {
  description: string;
  isSafeGuard?: boolean;
};

export type ErrorAdditions<TMetadata extends object | void = void> =
  TMetadata extends void
    ? {
        message?: string;
      }
    : {
        message?: string;
        metadata: TMetadata;
      };

export type ValidateResult<TMetadata extends object | void> =
  | (ValidateError & ErrorAdditions<TMetadata>)
  | undefined;

/**
 * Validate options
 *
 * @member {boolean} verbose is used to extensive error logging, default false
 */
export type ValidateOptions = {
  verbose?: boolean;
  stopOnFirstError?: boolean;
};

export type ValidateFn<T> =
  | ((value: T) => ValidateError | undefined)
  | ((value: T, options: ValidateOptions) => ValidateError | undefined);

export type ValidatorComponents<
  TValue,
  TMetadata extends object | void = void
> = {
  validator: ValidateFn<TValue>;
} & ErrorAdditions<TMetadata>;

export type Validator<TValue, TMetadata extends object | void = void> = (
  value: TValue,
  options: ValidateOptions
) => ValidateResult<TMetadata>;
