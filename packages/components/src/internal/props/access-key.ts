import type { AccessKeyPropType } from '../../schema/props/access-key';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type AccessKeyProp = SimpleProp<'accessKey', AccessKeyPropType>;
export const accessKeyProp = createPropDefinition<AccessKeyProp>('accessKey', '', normalizeString);
