import type { LabelPropType } from '../../schema';
import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

export type LabelWithExpertSlotProp = Prop<'label', LabelPropType, LabelPropType>;
export const labelWithExpertSlotProp = createPropDefinition<LabelWithExpertSlotProp>('label', '', (value: unknown) => {
	if (typeof value === 'string' || Array.isArray(value)) {
		return value as LabelPropType;
	}
	if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
		return String(value) as LabelPropType;
	}
	throw new TypeError(`Cannot convert ${typeof value} to LabelPropType`);
});
