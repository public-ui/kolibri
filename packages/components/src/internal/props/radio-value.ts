import type { StencilUnknown } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

/**
 * Value prop of `kol-input-radio`
 *
 * Description:
 * The value of the selected option; an option is selected when its `value` is strictly equal. Any value
 * is accepted, an array is reduced to its first entry. The default is `null`, no option is selected.
 * `kol-input-radio` keeps `null` and `undefined` as value instead of applying this definition to them.
 */
export type RadioValueProp = SimpleProp<'value', StencilUnknown>;
export const radioValueProp = createPropDefinition<RadioValueProp>('value', null as unknown as NonNullable<StencilUnknown>, (value: unknown) =>
	Array.isArray(value) ? (value[0] as NonNullable<StencilUnknown>) : (value as NonNullable<StencilUnknown>),
);
