import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

export type DisabledProp = SimpleProp<'disabled', boolean>;
export const disabledProp = createPropDefinition<DisabledProp>('disabled', false, normalizeBoolean);
