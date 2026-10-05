import type { Optgroup, RadioOption, SelectOption } from '../../../schema';

/**
 * Fills the map with the options by their key `-<index>`; options in an optgroup get the key of the
 * group as prefix, e.g. `-1-0`. Only options with a non-empty string label get a key.
 */
export const fillKeyOptionMap = <T>(keyOptionMap: Map<string, RadioOption<T>>, options: SelectOption<T>[], preKey = ''): void => {
	options.forEach((option, index) => {
		const key = `${preKey}-${index}`;
		if (typeof option === 'object' && option !== null && typeof option.label === 'string' && option.label.length > 0) {
			if (Array.isArray((option as Optgroup<T>).options)) {
				fillKeyOptionMap(keyOptionMap, (option as Optgroup<T>).options, key);
			} else {
				keyOptionMap.set(key, option as RadioOption<T>);
			}
		}
	});
};

/** Returns the options with the label as value for an option without value. */
export const normalizeOptionValues = <T>(options: RadioOption<T>[]): RadioOption<T>[] =>
	options.map((option) => {
		if (typeof option === 'object' && option !== null && typeof option.label === 'string') {
			return {
				...option,
				value: option.value ?? (option.label as T),
			};
		}
		return option;
	});
