import type { AlignPropType } from '../../schema/props/align-options';
import { alignPropTypeOptions } from '../../schema/props/align-options';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { isEnumOption, normalizeString } from './helpers/normalizers';

/**
 * Normalizer of the alignment props `_align`, `_tooltipAlign` and `_popoverAlign`: they share the
 * values 'top' | 'right' | 'bottom' | 'left'. Any other value throws, so it is ignored with a warning.
 */
export const createAlignNormalizer =
	(propName: string) =>
	(value: unknown): AlignPropType => {
		const str = normalizeString(value);
		if (isEnumOption(str, alignPropTypeOptions)) {
			return str;
		}
		throw new Error(`Invalid ${propName} value: ${str}`);
	};

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

export const alignProp = createPropDefinition<AlignProp>('align', 'top', createAlignNormalizer('align'));
