import type { InlinePropType } from '../../schema/props/inline';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

export type InlineProp = SimpleProp<'inline', InlinePropType>;
export const inlineProp = createPropDefinition<InlineProp>('inline', true, normalizeBoolean);
