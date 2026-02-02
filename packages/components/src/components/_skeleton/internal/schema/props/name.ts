import { createPropDefinition, type Prop } from './helpers/factory';
import { normalizeString, validateString } from './helpers/string';

export type NamePropType = string;
export type NameProp = Prop<NamePropType, 'name'>;
export const nameProp = createPropDefinition<NameProp>(normalizeString, validateString);
