import { createPropDefinition, type Prop } from './helpers/factory';
import { normalizeString, validateString } from './helpers/string';

export type LabelPropType = string;
export type LabelProp = Prop<LabelPropType, 'label'>;
export const labelProp = createPropDefinition<LabelProp>(normalizeString, validateString);
