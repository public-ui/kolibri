import type { StencilUnknown } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

/**
 * Value prop of `kol-input-checkbox`
 *
 * Description:
 * The value the checked checkbox submits and reports; an unchecked checkbox reports `null`. Any value
 * is accepted, the default is `true`. `kol-input-checkbox` keeps `null` and `undefined` as value
 * instead of applying this definition to them.
 */
export type CheckboxValueProp = SimpleProp<'value', StencilUnknown>;
export const checkboxValueProp = createPropDefinition<CheckboxValueProp>('value', true, (value: unknown) => value as NonNullable<StencilUnknown>);
