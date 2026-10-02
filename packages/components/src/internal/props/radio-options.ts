import type { RadioOption, RadioOptionsPropType, StencilUnknown } from '../../schema';
import { parseJson } from '../../schema';
import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

/**
 * Options prop for radio groups
 *
 * Description:
 * The options of `kol-input-radio`, as an array or as a JSON string when it is passed through an HTML
 * attribute. Every option needs a non-empty string `label`; one invalid option rejects the whole list.
 */
export type RadioOptionsProp = Prop<'options', RadioOptionsPropType, RadioOption<StencilUnknown>[]>;

const isValidOption = (option: unknown): boolean => {
	const label = typeof option === 'object' && option !== null ? (option as { label?: unknown }).label : undefined;
	return typeof label === 'string' && label.length > 0;
};

function normalizeRadioOptions(value: unknown): RadioOption<StencilUnknown>[] | never {
	const parsed = typeof value === 'string' ? parseJson<unknown>(value) : value;
	if (Array.isArray(parsed) && parsed.every(isValidOption)) {
		return parsed as RadioOption<StencilUnknown>[];
	}
	throw new Error('Invalid radio options');
}

// The default is an empty list: a radio group without options renders no option.
export const radioOptionsProp = createPropDefinition<RadioOptionsProp>('options', [], normalizeRadioOptions);
