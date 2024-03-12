import type { Generic } from 'adopted-style-sheets';

import { watchJsonArrayString, WatchOptions } from '../../utils/prop.validators';
import { validateInputSelectOptions } from '../../utils/validators/options';
import { Stringified } from '../common';
import { Optgroup, Option } from '../input/types';
import { W3CInputValue } from '../w3c';

/* types */

export type OptionsPropType = Stringified<Option<W3CInputValue>[]>;
export type OptionsWithOptgroupPropType = Stringified<(Option<W3CInputValue> | Optgroup<W3CInputValue>)[]>;

/**
 * Options the user can choose from.
 */
export type PropOptions = {
	options: OptionsPropType;
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
		(item: Option<W3CInputValue>) => typeof item === 'object' && item !== null && typeof item.label === 'string' && item.label.length > 0,
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
