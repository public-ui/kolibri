import type { ButtonCallbacksPropType, StencilUnknown } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createCallbacksPropDefinition } from './helpers/factory';

export type ButtonCallbacksProp = SimpleProp<'on', ButtonCallbacksPropType<StencilUnknown>>;

export const buttonCallbacksProp = createCallbacksPropDefinition<ButtonCallbacksPropType<StencilUnknown>>();
