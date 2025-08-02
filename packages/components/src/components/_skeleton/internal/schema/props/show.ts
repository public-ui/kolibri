import { BooleanValidator } from '../base-validator';

export type ShowPropType = boolean;

export type ShowProp = {
	show?: ShowPropType;
};

/**
 * Validator for show properties.
 * Show is an optional boolean that defaults to false.
 */
class ShowValidator extends BooleanValidator {
	constructor() {
		super(false); // defaultValue: false
	}
}

const showValidator = new ShowValidator();

// Legacy API - backward compatibility
export const normalizeShow = (value?: ShowPropType): ShowPropType => showValidator.normalize(value);
export const validateShow = (value?: ShowPropType): boolean => showValidator.validate(showValidator.normalize(value));

// New API - recommended for new implementations
export { showValidator };
