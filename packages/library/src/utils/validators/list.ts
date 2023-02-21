import { Optgroup, SelectOption } from '../../types/input/types';
import { a11yHint } from '../a11y.tipps';
import { containsOnlyNumbers, hasEnoughReadableChars } from './label';

export const validateInputSelectList = <T>(option: SelectOption<T>): boolean => {
	if (typeof option === 'object' && option !== null && typeof option.label === 'string' && option.label.length > 0) {
		option.disabled = option.disabled === true;
		option.label = `${option.label}`.trim();
		if (hasEnoughReadableChars(option.label, 3) === false && containsOnlyNumbers(option.label) === false) {
			a11yHint(
				`Ein abweichendes Aria-Label (${option.label}) ist nicht barrierefrei. Ein abweichendes Aria-Label sollte aus mindestens drei lesbaren Zeichen bestehen.`
			);
		}
		if (Array.isArray((option as Optgroup<T>).options)) {
			return (
				(option as Optgroup<T>).options.find((item) => {
					return validateInputSelectList(item) === false;
				}) === undefined
			);
		}
		return true;
	}
	return false;
};
