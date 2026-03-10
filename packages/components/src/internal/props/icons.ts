import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type IconsProp = SimpleProp<'icons', string>;
export const iconsProp = createPropDefinition<IconsProp>(normalizeString);
