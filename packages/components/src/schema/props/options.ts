import type { Optgroup, Option, RadioOption, StencilUnknown } from '../types';
import type { Stringified } from '../types/common';

/* types */

export type OptionsPropType = Stringified<Option<StencilUnknown>[]>;
export type OptionsWithOptgroupPropType = Stringified<(Option<StencilUnknown> | Optgroup<StencilUnknown>)[]>;
export type RadioOptionsPropType = Stringified<RadioOption<StencilUnknown>[]>;

/**
 * Options the user can choose from.
 */
export type PropOptions = {
	options: OptionsPropType;
};

export type PropRadioOptions = {
	options: RadioOptionsPropType;
};

/**
 * Options the user can choose from.
 */
export type PropOptionsWithOptgroup = {
	options: OptionsWithOptgroupPropType;
};
