import { createPropDefinition, type Prop } from './helpers/factory';
import { normalizeString, validateString } from './helpers/string';

export type CustomClassPropType = string;
export type CustomClassProp = Prop<CustomClassPropType, 'customClass'>;
export const customClassProp = createPropDefinition<CustomClassProp>(normalizeString, validateString);
