import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type LinkTargetProp = SimpleProp<'target', string>;
export const linkTargetProp = createPropDefinition<LinkTargetProp>('target', '', normalizeString);
