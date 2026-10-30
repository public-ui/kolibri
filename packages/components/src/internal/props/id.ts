import type { IdPropType } from '../../schema/props/id';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type IdProp = SimpleProp<'id', IdPropType>;

export const idProp = createPropDefinition<IdProp>('id', '', normalizeString);
