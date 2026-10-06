import type { AlignPropType } from '../../schema/props/align-options';
import { createAlignPropDefinition } from './helpers/align';
import type { SimpleProp } from './helpers/factory';

/**
 * Popover align prop.
 *
 * Same valid values as {@link alignProp} ('top' | 'right' | 'bottom' | 'left'); the default is
 * `'bottom'`, the documented default of `_popoverAlign`.
 */
export type PopoverAlignProp = SimpleProp<'popoverAlign', AlignPropType>;

export const popoverAlignProp = createAlignPropDefinition<PopoverAlignProp>('popoverAlign', 'bottom');
