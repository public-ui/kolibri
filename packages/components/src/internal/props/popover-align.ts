import type { AlignPropType } from '../../schema';
import { alignPropTypeOptions } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Popover align prop for `kol-popover-button`.
 *
 * Same valid values as {@link alignProp} ('top' | 'right' | 'bottom' | 'left') but defaults to
 * `'bottom'` to match the legacy `_popoverAlign` default on `kol-popover-button`.
 */
export type PopoverAlignProp = SimpleProp<'popoverAlign', AlignPropType>;

function normalizePopoverAlign(value: unknown): AlignPropType {
	const str = normalizeString(value);
	if ((alignPropTypeOptions as readonly string[]).includes(str)) {
		return str as AlignPropType;
	}
	return 'bottom';
}

export const popoverAlignProp = createPropDefinition<PopoverAlignProp>('popoverAlign', 'bottom', normalizePopoverAlign, (v) =>
	(alignPropTypeOptions as readonly string[]).includes(v),
);
