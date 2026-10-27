import type { LabelWithExpertSlotPropType } from '../../schema/props/label';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type LabelWithExpertSlotProp = SimpleProp<'label', LabelWithExpertSlotPropType>;
export const labelWithExpertSlotProp = createPropDefinition<LabelWithExpertSlotProp>('label', '', normalizeString);
