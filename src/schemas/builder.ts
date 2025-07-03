import { ValidatorBuilder } from './type';

export const createBuilder: ValidatorBuilder = ({ validator, message }) => {
	return {
		withMessage: (msg: string) => ({
			validator,
			message: msg,
		}),
		build: () => ({
			run: (value, options) => {
				const checked = validator(value, options);

				if (!checked) return undefined;

				return {
					...checked,
					message,
				};
			},
		}),
		validate: (value, options) => {
			const checked = validator(value, options);

			if (!checked) return undefined;

			return {
				...checked,
				message,
			};
		},
	};
};
