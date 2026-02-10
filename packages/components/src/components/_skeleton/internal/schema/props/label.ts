import { createPropDefinition, type SimpleProp } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type LabelProp = SimpleProp<string, 'label'>;
export const labelProp = createPropDefinition<string>(normalizeString, (v) => v.length >= 2 && v.length <= 80);
