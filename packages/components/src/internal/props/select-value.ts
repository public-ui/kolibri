import type { StencilUnknown, Stringified } from '../../schema';
import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

/**
 * Value prop of `kol-select`
 *
 * Description:
 * The selected values; a single value is wrapped into a list. A JSON string is not parsed, it is a
 * value of its own. The default is the empty list. `kol-select` keeps `null` as `[null]` instead of
 * applying this definition to it.
 */
export type SelectValueProp = Prop<'value', Stringified<StencilUnknown[]> | Stringified<StencilUnknown>, StencilUnknown[]>;
export const selectValueProp = createPropDefinition<SelectValueProp>('value', [], (value: unknown) =>
	Array.isArray(value) ? (value as StencilUnknown[]) : [value as StencilUnknown],
);
