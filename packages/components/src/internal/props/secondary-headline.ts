import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type SecondaryHeadlineProp = SimpleProp<'secondaryHeadline', string>;
export const secondaryHeadlineProp = createPropDefinition<SecondaryHeadlineProp>(normalizeString, () => true);
