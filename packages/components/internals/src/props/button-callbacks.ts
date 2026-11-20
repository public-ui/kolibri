import type { ButtonCallbacksPropType, StencilUnknown } from '../schema/index';
import { createCallbacksPropDefinition } from './helpers/factory';

export const buttonCallbacksProp = createCallbacksPropDefinition<ButtonCallbacksPropType<StencilUnknown>>();
