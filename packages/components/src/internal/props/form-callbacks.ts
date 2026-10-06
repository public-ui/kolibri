import type { KoliBriFormCallbacks } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createCallbacksPropDefinition } from './helpers/factory';

export type FormCallbacksProp = SimpleProp<'on', KoliBriFormCallbacks>;

export const formCallbacksProp = createCallbacksPropDefinition<KoliBriFormCallbacks>();
