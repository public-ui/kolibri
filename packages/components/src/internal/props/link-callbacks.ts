import type { LinkOnCallbacksPropType } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createCallbacksPropDefinition } from './helpers/factory';

export type LinkCallbacksProp = SimpleProp<'on', LinkOnCallbacksPropType>;

export const linkCallbacksProp = createCallbacksPropDefinition<LinkOnCallbacksPropType>();
