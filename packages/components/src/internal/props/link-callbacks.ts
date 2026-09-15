import type { LinkOnCallbacksPropType } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeCallbacksObject } from './helpers/normalizers';

export type LinkCallbacksProp = SimpleProp<'on', LinkOnCallbacksPropType>;

export const linkCallbacksProp = createPropDefinition<LinkCallbacksProp>('on', {}, (value) => normalizeCallbacksObject<LinkOnCallbacksPropType>(value));
