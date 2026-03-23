import type { AlignPropType } from '../../schema';
import { alignPropTypeOptions } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Align prop for directional placement
 *
 * Description:
 * Controls the alignment/placement direction of a floating element (tooltip, popover, etc.)
 * relative to its anchor. Valid values are 'top', 'right', 'bottom', 'left'.
 *
 * Usage (according to WCAG 2.1 and WAI-ARIA):
 * - Tooltips and popovers should be reachable by keyboard and have a logical reading order (WCAG 1.3.2)
 * - Placement must not obscure other meaningful content (WCAG 1.4.12)
 * - The placement preference is a visual hint; content must still be accessible regardless of direction
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/meaningful-sequence.html
 */
export type AlignProp = SimpleProp<'align', AlignPropType>;
export const alignProp = createPropDefinition<AlignProp>(
	'align',
	'top',
	(value) => {
		const str = normalizeString(value);
		if (!(alignPropTypeOptions as readonly string[]).includes(str)) {
			throw new Error(`Invalid align value: "${str}". Must be one of: ${alignPropTypeOptions.join(', ')}`);
		}
		return str as AlignPropType;
	},
	(v) => (alignPropTypeOptions as readonly string[]).includes(v),
);
