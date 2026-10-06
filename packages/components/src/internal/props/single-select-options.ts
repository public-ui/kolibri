import type { Option, OptionsPropType, StencilUnknown } from '../../schema';
import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeRadioOptions } from './radio-options';

/**
 * Options prop of `kol-single-select`
 *
 * Description:
 * The options the user can choose from, as an array or as a JSON string when it is passed through an
 * HTML attribute. Every option needs a non-empty string or a number as `label`; a number label becomes a
 * string. One option without a valid label rejects the whole list.
 */
export type SingleSelectOptionsProp = Prop<'options', OptionsPropType, Option<StencilUnknown>[]>;

// The default is an empty list: the listbox shows the no-results message.
export const singleSelectOptionsProp = createPropDefinition<SingleSelectOptionsProp>('options', [], normalizeRadioOptions);
