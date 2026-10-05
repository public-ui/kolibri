import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * CSS width of the component's own box, applied as an inline style (e.g. `100%`, `40rem`,
 * `fit-content`). Any CSS width value is allowed, so the prop only normalizes to a string.
 */
export type WidthProp = SimpleProp<'width', string>;
export const widthProp = createPropDefinition<WidthProp>('width', '100%', normalizeString);
