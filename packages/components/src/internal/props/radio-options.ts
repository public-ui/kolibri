import type { RadioOption, StencilUnknown } from '../../schema';
import type { OptionsProp } from './helpers/options';
import { createOptionsPropDefinition } from './helpers/options';

/** An option of `kol-input-radio` may carry a `hint`. */
export type RadioOptionsProp = OptionsProp<RadioOption<StencilUnknown>>;

export const radioOptionsProp = createOptionsPropDefinition<RadioOption<StencilUnknown>>();
