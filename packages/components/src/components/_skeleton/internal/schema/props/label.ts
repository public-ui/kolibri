import { StringValidator } from '../base-validator';

export type LabelPropType = string;

export type LabelProp = {
	label: LabelPropType;
};

/**
 * Validator for label properties.
 * Labels are optional strings that default to an empty string.
 */
class LabelValidator extends StringValidator {
	constructor() {
		super('', false); // defaultValue: '', required: false
	}
}

const labelValidator = new LabelValidator();

// Legacy API - backward compatibility
export const normalizeLabel = (value?: LabelPropType): LabelPropType => labelValidator.normalize(value);
export const validateLabel = (value?: LabelPropType): boolean => labelValidator.validate(labelValidator.normalize(value));

// New API - recommended for new implementations
export { labelValidator };
