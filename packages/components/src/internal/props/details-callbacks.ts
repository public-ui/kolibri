import type { DetailsCallbacksPropType } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeCallbacksObject } from './helpers/normalizers';

export type DetailsCallbacksProp = SimpleProp<'on', DetailsCallbacksPropType<boolean>>;

export const detailsCallbacksProp = createPropDefinition<DetailsCallbacksProp>('on', {}, (value) =>
	normalizeCallbacksObject<DetailsCallbacksPropType<boolean>>(value),
);
