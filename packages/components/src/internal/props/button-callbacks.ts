import type { ButtonCallbacksPropType, StencilUnknown } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeCallbacksObject } from './helpers/normalizers';

export type ButtonCallbacksProp = SimpleProp<'on', ButtonCallbacksPropType<StencilUnknown>>;

export const buttonCallbacksProp = createPropDefinition<ButtonCallbacksProp>('on', {}, (value) =>
	normalizeCallbacksObject<ButtonCallbacksPropType<StencilUnknown>>(value),
);
