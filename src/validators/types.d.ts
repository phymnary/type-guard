/**
 * Validate options
 *
 * @member {boolean} verbose is used to extensive error logging, default false
 */
export type ValidateOptions = {
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

export type ValidateFn<T> = (value: T) => ValidateError | undefined;

export type FieldValidateResult = (ValidateError & ErrorDetails) | undefined;
