import { createPropDefinition, type Prop } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type NameProp = Prop<'name', string>;
export const nameProp = createPropDefinition<string>(normalizeString, () => true);
