import type { LinkTargetPropType } from '../../schema/props/link-target';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

export type LinkTargetProp = SimpleProp<'target', LinkTargetPropType>;
export const linkTargetProp = createPropDefinition<LinkTargetProp>('target', '', normalizeString);
