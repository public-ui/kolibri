import { createPropDefinition, type Prop } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type LabelProp = Prop<'label', string>;
export const labelProp = createPropDefinition<string>(normalizeString, (v) => v.length >= 2 && v.length <= 80);
