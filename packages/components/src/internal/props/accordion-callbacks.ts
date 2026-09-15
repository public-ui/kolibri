import type { AccordionCallbacksPropType } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeCallbacksObject } from './helpers/normalizers';

export type AccordionCallbacksProp = SimpleProp<'on', AccordionCallbacksPropType<boolean>>;

export const accordionCallbacksProp = createPropDefinition<AccordionCallbacksProp>('on', {}, (value) =>
	normalizeCallbacksObject<AccordionCallbacksPropType<boolean>>(value),
);
