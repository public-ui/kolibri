import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

/**
 * Align prop for positioning components
 *
 * Description:
 * Controls the alignment/placement of floating UI elements (popovers, tooltips, etc.)
 * relative to a reference element.
 *
 * Valid options: 'top', 'right', 'bottom', 'left'
 */

export const alignOptions = ['top', 'right', 'bottom', 'left'] as const;
export type AlignType = (typeof alignOptions)[number];

export type AlignProp = SimpleProp<'align', AlignType>;

const normalizeAlign = (value: unknown): AlignType => {
	if (typeof value === 'string' && alignOptions.includes(value as AlignType)) {
		return value as AlignType;
	}
	return 'top'; // default
};

const validateAlign = (value: AlignType): boolean => {
	return alignOptions.includes(value);
};

export const alignProp = createPropDefinition<AlignProp>('align', 'top', normalizeAlign, validateAlign);
