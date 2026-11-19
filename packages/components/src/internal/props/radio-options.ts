import type { RadioOption, RadioOptionsPropType, StencilUnknown } from '../../schema';
import type { Prop } from './helpers/factory';
import { createOptionsPropDefinition } from './helpers/options';

/** An option of `kol-input-radio` may carry a `hint`. */
export type RadioOptionsProp = Prop<'options', RadioOptionsPropType, RadioOption<StencilUnknown>[]>;

export const radioOptionsProp = createOptionsPropDefinition<RadioOptionsProp>();
