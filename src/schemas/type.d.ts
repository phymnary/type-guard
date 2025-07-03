export type FirstClassJsType =
	| 'undefined'
	| 'object'
	| 'boolean'
	| 'number'
	| 'bigint'
	| 'string'
	| 'symbol'
	| 'function';

export type ValidateError = {
	description: string;
	isSafeGuard?: boolean;
};

export type ValidateMetadata = {
	message?: string;
};

export type ValidateResult = (ValidateError & ValidateMetadata) | undefined;

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

export type ValidatorComponents<T> = {
	validator: ValidateFn<T>;
} & ValidateMetadata;

export type Validator<T> = (value: T, options: ValidateOptions) => ValidateResult;

export type ValidatorBuilder = {
	<T>(components: ValidatorComponents<T>): {
		withMessage: (msg: string) => ValidatorComponents<T>;
		build: () => {
			run: Validator<T>;
		};
		validate: Validator<T>;
	};
};
