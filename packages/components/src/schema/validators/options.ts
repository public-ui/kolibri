import { containsOnlyNumbers, hasEnoughReadableChars } from '../props';
import { a11yHint } from '../utils';

import type { Optgroup, SelectOption } from '../types';
export const validateInputSelectOptions = <T>(option: SelectOption<T>): boolean => {
	if (typeof option === 'object' && option !== null) {
		if (typeof option.label === 'string' && option.label.length > 0) {
			option.disabled = option.disabled === true;
			option.label = `${option.label}`.trim();
			if (hasEnoughReadableChars(option.label, 3) === false && containsOnlyNumbers(option.label) === false) {
				a11yHint(`A differing Aria-Label (${option.label}) is not accessible. A differing Aria-Label should consist of at least three readable characters.`);
			}
			if (Array.isArray((option as Optgroup<T>).options)) {
				return (
					(option as Optgroup<T>).options.find((item) => {
						return validateInputSelectOptions(item) === false;
					}) === undefined
				);
			}
			return true;
		} else if (typeof option.label === 'number') {
			return true;
		}
	}
	return false;
};
