import type { KoliBriPaginationButtonCallbacks } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createCallbacksPropDefinition } from './helpers/factory';

export type PaginationCallbacksProp = SimpleProp<'on', KoliBriPaginationButtonCallbacks>;

export const paginationCallbacksProp = createCallbacksPropDefinition<KoliBriPaginationButtonCallbacks>();
