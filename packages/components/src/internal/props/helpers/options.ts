import type { Option, StencilUnknown, Stringified } from '../../../schema';
import { parseJson } from '../../../schema';
import type { Prop, PropDefinition } from './factory';
import { createPropDefinition } from './factory';

/** The `_options` prop with options of type `T`. */
export type OptionsProp<T extends Option<StencilUnknown>> = Prop<'options', Stringified<T[]>, T[]>;

const getLabel = (option: unknown): unknown => (typeof option === 'object' && option !== null ? (option as { label?: unknown }).label : undefined);

const isValidOption = (option: unknown): boolean => {
	const label = getLabel(option);
	return (typeof label === 'string' && label.length > 0) || (typeof label === 'number' && Number.isFinite(label));
};

/**
 * The `_options` prop of a field with a flat list of options (`kol-input-radio`, `kol-single-select`).
 *
 * The options come as an array or as a JSON string when they are passed through an HTML attribute.
 * Every option needs a non-empty string or a finite number as `label`; a number label becomes a string,
 * so the fields can compare and filter the labels as text. One option without a valid label rejects the
 * whole list and keeps the previous options. The default is an empty list.
 */
export function createOptionsPropDefinition<T extends Option<StencilUnknown>>(): PropDefinition<T[], OptionsProp<T>> {
	return createPropDefinition<OptionsProp<T>>('options', [], (value) => {
		const parsed = typeof value === 'string' ? parseJson<unknown>(value) : value;
		if (Array.isArray(parsed) && parsed.every(isValidOption)) {
			const options = parsed as T[];
			return options.some((option) => typeof option.label === 'number') ? options.map((option) => ({ ...option, label: String(option.label) })) : options;
		}
		throw new Error('Invalid options');
	});
}
