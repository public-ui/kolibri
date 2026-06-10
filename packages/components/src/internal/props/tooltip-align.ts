import type { TooltipAlignPropType } from '../../schema';
import { alignPropTypeOptions } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Tooltip Align prop for positioning the tooltip of a component
 *
 * Description:
 * Controls where the tooltip is preferably shown relative to its reference
 * element: top, right, bottom or left.
 *
 * Valid values: 'top' | 'right' | 'bottom' | 'left'
 * Default: 'top'
 *
 * Accessibility:
 * - Alignment should be chosen to ensure the tooltip is visible and does not obscure
 *   important content for users with low vision or screen magnification
 */
export type TooltipAlignProp = SimpleProp<'tooltipAlign', TooltipAlignPropType>;

export const tooltipAlignProp = createPropDefinition<TooltipAlignProp>(
	'tooltipAlign',
	'top',
	(value) => {
		const str = normalizeString(value);
		if ((alignPropTypeOptions as readonly string[]).includes(str)) {
			return str as TooltipAlignPropType;
		}
		throw new Error(`Invalid tooltipAlign value: ${str}`);
	},
	(v) => (alignPropTypeOptions as readonly string[]).includes(v),
);
