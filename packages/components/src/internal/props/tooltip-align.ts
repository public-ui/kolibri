import type { AlignPropType } from '../../schema';
import { alignPropTypeOptions } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type TooltipAlignProp = SimpleProp<'tooltipAlign', AlignPropType>;
export const tooltipAlignProp = createPropDefinition<TooltipAlignProp>(
	'tooltipAlign',
	'right' as AlignPropType,
	(value) => {
		if (value === undefined || value === null || value === '') return 'right' as AlignPropType;
		const str = normalizeString(value);
		if ((alignPropTypeOptions as readonly string[]).includes(str)) {
			return str as AlignPropType;
		}
		throw new Error(`Invalid tooltipAlign: ${str}`);
	},
	(v) => (alignPropTypeOptions as readonly string[]).includes(v),
);

/**
 * Buttons show their tooltip above by default (unlike links, which default to the right).
 */
export const buttonTooltipAlignProp = createPropDefinition<TooltipAlignProp>(
	'tooltipAlign',
	'top' as AlignPropType,
	(value) => {
		if (value === undefined || value === null || value === '') return 'top' as AlignPropType;
		const str = normalizeString(value);
		if ((alignPropTypeOptions as readonly string[]).includes(str)) {
			return str as AlignPropType;
		}
		throw new Error(`Invalid tooltipAlign: ${str}`);
	},
	(v) => (alignPropTypeOptions as readonly string[]).includes(v),
);
