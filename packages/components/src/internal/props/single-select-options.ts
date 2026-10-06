import type { Option, StencilUnknown } from '../../schema';
import type { OptionsProp } from './helpers/options';
import { createOptionsPropDefinition } from './helpers/options';

export type SingleSelectOptionsProp = OptionsProp<Option<StencilUnknown>>;

export const singleSelectOptionsProp = createOptionsPropDefinition<Option<StencilUnknown>>();
