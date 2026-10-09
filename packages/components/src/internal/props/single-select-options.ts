import type { Option, OptionsPropType, StencilUnknown } from '../../schema';
import type { Prop } from './helpers/factory';
import { createOptionsPropDefinition } from './helpers/options';

export type SingleSelectOptionsProp = Prop<'options', OptionsPropType, Option<StencilUnknown>[]>;

export const singleSelectOptionsProp = createOptionsPropDefinition<SingleSelectOptionsProp>();
