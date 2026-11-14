import type { LinkOnCallbacksPropType } from '../schema/index';
import { createCallbacksPropDefinition } from './helpers/factory';

export const linkCallbacksProp = createCallbacksPropDefinition<LinkOnCallbacksPropType>();
