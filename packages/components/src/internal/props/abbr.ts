import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Abbreviation prop of `kol-abbr`
 *
 * Description:
 * The visible abbreviation, e.g. `z. B.`. A single character is allowed (`m`, `g`).
 */
export type AbbrProp = SimpleProp<'abbr', string>;
// The default is `undefined`: without an abbreviation the deprecated default slot is rendered.
export const abbrProp = createPropDefinition<AbbrProp>('abbr', undefined as unknown as string, normalizeString);
