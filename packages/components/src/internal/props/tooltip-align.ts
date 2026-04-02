import type { AlignPropType } from '../../schema';
import { alignPropTypeOptions } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Tooltip Align prop
 *
 * Defines where to show the Tooltip preferably: top, right, bottom or left.
 * Default: 'right'
 */
export type TooltipAlignProp = SimpleProp<'tooltipAlign', AlignPropType>;

export const tooltipAlignProp = createPropDefinition<TooltipAlignProp>(
	'tooltipAlign',
	'right',
	(value) => {
		const str = normalizeString(value);
		if ((alignPropTypeOptions as readonly string[]).includes(str)) {
			return str as AlignPropType;
		}
		throw new Error(`Invalid tooltipAlign value: ${str}`);
	},
	(v) => (alignPropTypeOptions as readonly string[]).includes(v),
);
