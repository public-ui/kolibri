import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

export type ShowProp = SimpleProp<'show', boolean>;
export const showProp = createPropDefinition<ShowProp>(normalizeBoolean);
