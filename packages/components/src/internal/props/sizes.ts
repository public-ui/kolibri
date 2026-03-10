import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type SizesProp = SimpleProp<'sizes', string>;
export const sizesProp = createPropDefinition<SizesProp>(normalizeString, () => true, '');
