import type { RadioOption, RadioOptionsPropType, StencilUnknown } from '../../schema';
import { parseJson } from '../../schema';
import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

/**
 * Options prop of `kol-input-radio` and `kol-single-select`
 *
 * Description:
 * The options the user can choose from, as an array or as a JSON string when it is passed through an
 * HTML attribute. An option of `kol-input-radio` may carry a `hint`. Every option needs a non-empty string or a number as `label`; a number label becomes a
 * string. One option without a valid label rejects the whole list.
 */
export type OptionsProp = Prop<'options', RadioOptionsPropType, RadioOption<StencilUnknown>[]>;

const getLabel = (option: unknown): unknown => (typeof option === 'object' && option !== null ? (option as { label?: unknown }).label : undefined);

const isValidOption = (option: unknown): boolean => {
	const label = getLabel(option);
	return (typeof label === 'string' && label.length > 0) || (typeof label === 'number' && Number.isFinite(label));
};

/**
 * Parses a JSON string and accepts an array of options with a non-empty string or a finite number as
 * `label` each; throws otherwise. A number label is converted to its string, so the fields can compare
 * and filter the labels as text.
 */
export function normalizeOptions(value: unknown): RadioOption<StencilUnknown>[] | never {
	const parsed = typeof value === 'string' ? parseJson<unknown>(value) : value;
	if (Array.isArray(parsed) && parsed.every(isValidOption)) {
		const options = parsed as RadioOption<StencilUnknown>[];
		return options.some((option) => typeof option.label === 'number') ? options.map((option) => ({ ...option, label: String(option.label) })) : options;
	}
	throw new Error('Invalid options');
}

// The default is an empty list: a radio group renders no option, and the single select shows the no-results message.
export const optionsProp = createPropDefinition<OptionsProp>('options', [], normalizeOptions);
