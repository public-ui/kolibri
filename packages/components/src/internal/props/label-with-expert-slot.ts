import type { LabelWithExpertSlotPropType } from '../../schema/props/label';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';
import { isValidLabel } from './helpers/validators';
import { labelHints } from './hints/label-hints';

export type LabelWithExpertSlotProp = SimpleProp<'label', LabelWithExpertSlotPropType>;
export const labelWithExpertSlotProp = createPropDefinition<LabelWithExpertSlotProp>('label', '', normalizeString, isValidLabel, {
	hints: labelHints,
});
