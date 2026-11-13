import type { LabelDecorativePropType } from '../../schema/props/label';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';
import { isValidLabelDecorative } from './helpers/validators';
import { labelHints } from './hints/label-hints';

/** Label prop of an icon, see `LabelDecorativePropType`. */
export type LabelDecorativeProp = SimpleProp<'label', LabelDecorativePropType>;
export const labelDecorativeProp = createPropDefinition<LabelDecorativeProp>('label', undefined, normalizeString, isValidLabelDecorative, {
	hints: labelHints,
});
