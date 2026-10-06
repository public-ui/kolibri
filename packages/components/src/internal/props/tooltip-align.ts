import type { AlignPropType } from '../../schema/props/align-options';
import { createAlignPropDefinition } from './helpers/align';
import type { SimpleProp } from './helpers/factory';

/**
 * Tooltip align prop for kol-link.
 *
 * Same valid values as {@link alignProp} ('top' | 'right' | 'bottom' | 'left') but defaults to
 * `'right'` to match the legacy `_tooltipAlign` default on kol-link.
 */
export type TooltipAlignProp = SimpleProp<'tooltipAlign', AlignPropType>;

export const tooltipAlignProp = createAlignPropDefinition<TooltipAlignProp>('tooltipAlign', 'right');
