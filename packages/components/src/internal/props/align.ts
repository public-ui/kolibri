import type { AlignPropType } from '../../schema';
import { alignPropTypeOptions } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Align prop for positioning floating elements
 *
 * Description:
 * Controls the alignment of floating elements (tooltips, popovers, tabs) relative to their
 * reference element. The alignment affects how the floating element is positioned and which
 * side the arrow points from.
 *
 * Valid values: 'top' | 'right' | 'bottom' | 'left'
 * Default: 'top'
 *
 * Accessibility:
 * - Alignment should be chosen to ensure floating content is visible and does not obscure
 *   important content for users with low vision or screen magnification
 */
export type AlignProp = SimpleProp<'align', AlignPropType>;

export const alignProp = createPropDefinition<AlignProp>(
	'align',
	'top',
	(value) => {
		const str = normalizeString(value);
		if ((alignPropTypeOptions as readonly string[]).includes(str)) {
			return str as AlignPropType;
		}
		throw new Error(`Invalid align value: ${str}`);
	},
	(v) => (alignPropTypeOptions as readonly string[]).includes(v),
);
