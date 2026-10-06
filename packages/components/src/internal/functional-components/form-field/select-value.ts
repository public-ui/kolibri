import type { Option, StencilUnknown } from '../../../schema';
import type { SelectOptionsList } from '../../props/options-with-optgroup';

/**
 * Throws when the shape of a `_value` does not match `_multiple`: a list in single mode, or a single
 * value in multiple mode. The field throws from its watcher, so the value is not applied. `source`
 * names the value in the message: the received value of a `_value` change, or the current value on
 * a `_multiple` change.
 */
export const assertSelectValueMatchesMultiplicity = (value: unknown, multiple: boolean, source: 'current' | 'received'): void => {
	const isArray = Array.isArray(value);

	if (multiple) {
		if (value !== undefined && !isArray) {
			throw new Error(
				`↑ The schema for the property (_value) is not valid for multiple mode. Expected an array. The value will not be changed. (${source} = ${JSON.stringify(value)})`,
			);
		}
	} else if (isArray) {
		throw new Error(
			`↑ The schema for the property (_value) is not valid for single mode. Expected a single value. The value will not be changed. (${source} = ${JSON.stringify(value)})`,
		);
	}
};

/** The options of the list, with the options of each optgroup in place of the optgroup. */
const flattenSelectOptions = (options: SelectOptionsList): Option<StencilUnknown>[] =>
	options.flatMap((entry) => ('options' in entry && Array.isArray(entry.options) ? flattenSelectOptions(entry.options) : [entry as Option<StencilUnknown>]));

/**
 * Keeps only the values that belong to an option. Then, in single mode (`multiple === false`, not
 * merely falsy) without a value, the value becomes the value of the first enabled option, which is
 * the option the native select shows. Without options, the value is kept as it is, because the
 * options can follow the value.
 */
export const normalizeSelectValue = (value: StencilUnknown[], options: SelectOptionsList, multiple: boolean | undefined): StencilUnknown[] => {
	if (options.length === 0) {
		return value;
	}
	const flatOptions = flattenSelectOptions(options);
	const optionValues = flatOptions.map((option) => option.value);
	const filtered = value.every((item) => optionValues.includes(item)) ? value : value.filter((item) => optionValues.includes(item));
	if (multiple === false && filtered.length === 0) {
		const firstEnabled = flatOptions.find((option) => option.disabled !== true);
		return firstEnabled ? [firstEnabled.value] : filtered;
	}
	return filtered;
};
