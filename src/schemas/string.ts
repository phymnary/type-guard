import { createBuilder } from './builder';
import type { ValidateFn } from './type';

const validateString: ValidateFn<string> = (value, options) => {
	const { verbose } = options;

	if (typeof value === 'string') return undefined;
	return {
		description: `value ${verbose ? value + ' ' : ''} is not a string`,
		isSafeGuard: true,
	};
};

export const string = createBuilder({ validator: validateString });

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-8][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const validateUuid: ValidateFn<string> = (value, options) => {
	const { verbose } = options;

	if (value.match(uuidRegex)) return;

	return {
		description: `value ${verbose ? value + ' ' : ''} is not a UUID`,
	};
};

export const uuid = createBuilder({ validator: validateUuid });

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmail: ValidateFn<string> = (value, options) => {
	const { verbose } = options;

	if (value.match(emailRegex)) return;

	return {
		description: `value ${verbose ? value + ' ' : ''} is not an email`,
	};
};

export const email = createBuilder({ validator: validateEmail });
