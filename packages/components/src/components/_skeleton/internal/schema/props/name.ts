import { StringValidator } from '../base-validator';

export type NamePropType = string;

export type NameProp = {
	name: NamePropType;
};

/**
 * Validator for name properties.
 * Names are required strings with a minimum length of 1 character.
 */
class NameValidator extends StringValidator {
	constructor() {
		super('', true, 1); // defaultValue: '', required: true, minLength: 1
	}
}

const nameValidator = new NameValidator();

// Legacy API - backward compatibility
export const normalizeName = (value?: NamePropType): NamePropType => nameValidator.normalize(value);
export const validateName = (value?: NamePropType): boolean => nameValidator.validate(nameValidator.normalize(value));

// New API - recommended for new implementations
export { nameValidator };
