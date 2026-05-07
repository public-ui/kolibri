import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

const SAFE_CLASS_NAME_RE = /^[a-zA-Z][a-zA-Z0-9_-]{0,60}$/;

export type CustomClassProp = SimpleProp<'customClass', string>;
export const customClassProp = createPropDefinition<CustomClassProp>('customClass', '', normalizeString, (v) => v === '' || SAFE_CLASS_NAME_RE.test(v));
