import { createPropDefinition, type Prop } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type LabelProp = Prop<string, 'label'>;
export const labelProp = createPropDefinition<LabelProp>(normalizeString, (v) => v.length >= 2 && v.length <= 80);
