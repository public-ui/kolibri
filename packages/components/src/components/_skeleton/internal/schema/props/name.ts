import { createPropDefinition, type SimpleProp } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type NameProp = SimpleProp<string, 'name'>;
export const nameProp = createPropDefinition<string>(normalizeString, () => true);
