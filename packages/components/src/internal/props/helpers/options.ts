import type { Option, StencilUnknown } from '../../../schema';
import { parseJson } from '../../../schema';
import type { ExtractPropKey, InternalPropValue, Prop, PropDefinition } from './factory';
import { createPropDefinition } from './factory';

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
export function createOptionsPropDefinition<P extends Prop<'options', unknown, Option<StencilUnknown>[]>>(): PropDefinition<InternalPropValue<P>, P> {
	return createPropDefinition<P>('options' as ExtractPropKey<P>, [] as InternalPropValue<P>, (value) => {
		const parsed = typeof value === 'string' ? parseJson<unknown>(value) : value;
		if (Array.isArray(parsed) && parsed.every(isValidOption)) {
			const options = parsed as Option<StencilUnknown>[];
			return (
				options.some((option) => typeof option.label === 'number') ? options.map((option) => ({ ...option, label: String(option.label) })) : options
			) as InternalPropValue<P>;
		}
		throw new Error('Invalid options');
	});
}
