import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Target prop
 *
 * Defines where to open the link.
 * Common values: '_blank', '_parent', '_self', '_top', or a frame name.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target
 */
export type TargetProp = SimpleProp<'target', string>;

export const targetProp = createPropDefinition<TargetProp>('target', '', normalizeString);
