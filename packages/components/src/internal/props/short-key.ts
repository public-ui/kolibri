import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Short Key prop
 *
 * Adds a visual shortcut hint after the label and instructs the screen reader to
 * read the shortcut aloud via the aria-keyshortcuts attribute.
 */
export type ShortKeyProp = SimpleProp<'shortKey', string>;

export const shortKeyProp = createPropDefinition<ShortKeyProp>('shortKey', '', normalizeString);
