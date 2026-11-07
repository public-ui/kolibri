import type { LabelDecorativePropType } from '../../schema/props/label';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';
import { isValidLabelDecorative } from './helpers/validators';
import { labelHints } from './hints/label-hints';

/**
 * Label prop of an icon, see `LabelDecorativePropType`. A non-empty label follows the rules of
 * `labelProp`; the empty string is valid as well, so a label can switch to decorative at runtime.
 */
export type LabelDecorativeProp = SimpleProp<'label', LabelDecorativePropType>;
export const labelDecorativeProp = createPropDefinition<LabelDecorativeProp>('label', undefined, normalizeString, isValidLabelDecorative, {
	hints: labelHints,
});
