import { createPropDefinition, type Prop } from './helpers/factory';
import { normalizeInteger, validateInteger } from './helpers/integer';

export type SiblingCountPropType = number;
export type SiblingCountProp = Prop<SiblingCountPropType, 'siblingCount'>;
export const siblingCountProp = createPropDefinition<SiblingCountProp>(normalizeInteger, validateInteger);
