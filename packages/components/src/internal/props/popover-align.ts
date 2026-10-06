import type { AlignPropType } from '../../schema/props/align-options';
import { createAlignPropDefinition } from './helpers/align';
import type { SimpleProp } from './helpers/factory';

/**
 * Popover align prop.
 *
 * Same valid values as {@link alignProp} ('top' | 'right' | 'bottom' | 'left') but defaults to
 * `'bottom'` to match the legacy `_popoverAlign` default.
 */
export type PopoverAlignProp = SimpleProp<'popoverAlign', AlignPropType>;

export const popoverAlignProp = createAlignPropDefinition<PopoverAlignProp>('popoverAlign', 'bottom');
