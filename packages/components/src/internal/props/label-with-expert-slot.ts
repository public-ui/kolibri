import type { LabelLangSegmentsPropType } from '../../schema';
import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

export type LabelWithExpertSlotProp = Prop<'label', LabelLangSegmentsPropType, LabelLangSegmentsPropType>;
export const labelWithExpertSlotProp = createPropDefinition<LabelWithExpertSlotProp>('label', '', (value: unknown) => {
	if (typeof value === 'string' || Array.isArray(value)) {
		return value as LabelLangSegmentsPropType;
	}
	if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
		return String(value) as LabelLangSegmentsPropType;
	}
	throw new TypeError(`Cannot convert ${typeof value} to LabelLangSegmentsPropType`);
});
