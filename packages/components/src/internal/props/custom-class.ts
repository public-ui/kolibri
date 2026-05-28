import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString, SAFE_CLASS_NAME_RE } from './helpers/normalizers';

export type CustomClassProp = SimpleProp<'customClass', string>;
export const customClassProp = createPropDefinition<CustomClassProp>('customClass', '', normalizeString, (v) => v === '' || SAFE_CLASS_NAME_RE.test(v));
