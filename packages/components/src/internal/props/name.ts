import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type NameProp = SimpleProp<'name', string>;
export const nameProp = createPropDefinition<NameProp>(normalizeString);
