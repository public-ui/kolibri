import type { StencilUnknown } from '../../../schema';
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

/**
 * Preselects the first option: with options, in single mode (`multiple === false`, not merely
 * falsy) and without a value, the value becomes the value of the first entry, which is `undefined`
 * for an optgroup. Any other value is kept as it is, also when it matches no option.
 */
export const normalizeSelectValue = (value: StencilUnknown[], options: SelectOptionsList, multiple: boolean | undefined): StencilUnknown[] => {
	if (options.length > 0 && multiple === false && value.length === 0) {
		return [(options[0] as { value?: StencilUnknown }).value];
	}
	return value;
};
