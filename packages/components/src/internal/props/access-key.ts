import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type AccessKeyProp = SimpleProp<'accessKey', string>;
export const accessKeyProp = createPropDefinition<AccessKeyProp>('accessKey', '', normalizeString);
