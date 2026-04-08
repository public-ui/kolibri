import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type IdProp = SimpleProp<'id', string>;

export const idProp = createPropDefinition<IdProp>('id', '', normalizeString);
