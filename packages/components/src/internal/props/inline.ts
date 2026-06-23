import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

export type InlineProp = SimpleProp<'inline', boolean>;
export const inlineProp = createPropDefinition<InlineProp>('inline', true, normalizeBoolean);

/**
 * Buttons are standalone blocks by default (unlike links, which default to inline).
 */
export const buttonInlineProp = createPropDefinition<InlineProp>('inline', false, normalizeBoolean);
