import { createPropDefinition, type Prop } from './helpers/factory';
import { normalizeString, validateString } from './helpers/string';

export type IconsPropType = string;
export type IconsProp = Prop<IconsPropType, 'icons'>;
export const iconsProp = createPropDefinition<IconsProp>(normalizeString, validateString);
