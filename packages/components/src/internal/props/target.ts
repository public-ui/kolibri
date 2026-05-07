import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type TargetProp = SimpleProp<'target', string>;
export const targetProp = createPropDefinition<TargetProp>('target', '', normalizeString);
