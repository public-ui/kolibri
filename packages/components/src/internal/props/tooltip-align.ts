import type { AlignPropType } from '../../schema';
import { alignPropTypeOptions } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Tooltip align prop for kol-link.
 *
 * Same valid values as {@link alignProp} ('top' | 'right' | 'bottom' | 'left') but defaults to
 * `'right'` to match the legacy `_tooltipAlign` default on kol-link.
 */
export type TooltipAlignProp = SimpleProp<'tooltipAlign', AlignPropType>;

function normalizeTooltipAlign(value: unknown): AlignPropType {
	const str = normalizeString(value);
	if ((alignPropTypeOptions as readonly string[]).includes(str)) {
		return str as AlignPropType;
	}
	return 'right';
}

export const tooltipAlignProp = createPropDefinition<TooltipAlignProp>('tooltipAlign', 'right', normalizeTooltipAlign, (v) =>
	(alignPropTypeOptions as readonly string[]).includes(v),
);
