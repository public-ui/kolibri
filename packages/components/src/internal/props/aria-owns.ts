import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type AriaOwnsProp = SimpleProp<'ariaOwns', string>;
export const ariaOwnsProp = createPropDefinition<AriaOwnsProp>('ariaOwns', '', normalizeString);
