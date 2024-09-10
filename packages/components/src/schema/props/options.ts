import type { Generic } from 'adopted-style-sheets';

import type { RadioOption, Optgroup, Option, StencilUnknown } from '../types';
import type { Stringified } from '../types/common';
import type { WatchOptions } from '../utils';
import { watchJsonArrayString } from '../utils';
import { validateInputSelectOptions } from '../validators';

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
 * Options the user can choose from, also supporting Optgroup.
 */
export type PropOptionsWithOptgroup = {
	options: OptionsWithOptgroupPropType;
};

/* validators */

export const validateOptions = (component: Generic.Element.Component, value: OptionsPropType | undefined, options: WatchOptions = {}): void => {
	watchJsonArrayString(
		component,
		'_options',
		(item: Option<StencilUnknown>) => typeof item === 'object' && item !== null && typeof item.label === 'string' && item.label.length > 0,
		value,
		undefined,
		options,
	);
};

export const validateOptionsWithOptgroup = (
	component: Generic.Element.Component,
	value: OptionsWithOptgroupPropType | undefined,
	options: WatchOptions = {},
) => {
	watchJsonArrayString(component, '_options', validateInputSelectOptions, value, undefined, options);
};
