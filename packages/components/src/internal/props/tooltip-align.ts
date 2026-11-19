import type { AlignPropType } from '../../schema/props/align-options';
import { createAlignPropDefinition } from './helpers/align';
import type { SimpleProp } from './helpers/factory';

/**
 * Tooltip align prop.
 *
 * Same valid values as {@link alignProp} ('top' | 'right' | 'bottom' | 'left'); the default is
 * `'right'`, the documented default of kol-link. A component with another documented default sets it
 * itself (e.g. `'top'` for the button elements).
 */
export type TooltipAlignProp = SimpleProp<'tooltipAlign', AlignPropType>;

export const tooltipAlignProp = createAlignPropDefinition<TooltipAlignProp>('tooltipAlign', 'right');
