import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export const orientationOptions = ['horizontal', 'vertical'] as const;
export type OrientationPropType = (typeof orientationOptions)[number];

export function normalizeOrientation(value: unknown): OrientationPropType | never {
	const str = normalizeString(value);
	if (orientationOptions.includes(str as OrientationPropType)) {
		return str as OrientationPropType;
	}
	throw new Error(`Invalid orientation: ${str}`);
}

export type OrientationProp = SimpleProp<'orientation', OrientationPropType>;
export const orientationProp = createPropDefinition<OrientationProp>('orientation', 'horizontal', normalizeOrientation);
