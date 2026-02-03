import { createPropDefinition, type Prop } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type NameProp = Prop<string, 'name'>;
export const nameProp = createPropDefinition<NameProp>(normalizeString, () => true);
