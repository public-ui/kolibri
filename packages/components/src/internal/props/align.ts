import type { AlignPropType } from '../../schema/props/align-options';
import { createAlignNormalizer } from './helpers/align';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

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
