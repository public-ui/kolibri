import type { Generic } from 'adopted-style-sheets';

import { devHint } from '../utils';

import { type HideMsgPropType, validateHideMsg } from './hide-msg';

/* types */
export type HideErrorPropType = HideMsgPropType;

/**
 * @deprecated Use `_hideMsg` instead.
 */
export type PropHideError = {
	/** @deprecated Use `_hideMsg` instead. */
	hideError: HideErrorPropType;
};

/* validator */
/** @deprecated Use `_hideMsg` instead. */
export const validateHideError = (component: Generic.Element.Component, value?: HideErrorPropType): void => {
	if (typeof value !== 'undefined') {
		devHint('Property `_hideError` is deprecated. Use `_hideMsg` instead.');
	}
	validateHideMsg(component, value, { defaultValue: component.state?._hideMsg ?? false });
};
