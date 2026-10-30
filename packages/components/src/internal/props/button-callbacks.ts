import type { ButtonCallbacksPropType, StencilUnknown } from '../../schema';
import { createCallbacksPropDefinition } from './helpers/factory';

export const buttonCallbacksProp = createCallbacksPropDefinition<ButtonCallbacksPropType<StencilUnknown>>();
