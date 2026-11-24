import {
	ariaDetailsProp,
	disabledProp,
	hideLabelProp,
	hideMsgProp,
	hintProp,
	infoPopoverProp,
	inputCallbacksProp,
	labelWithExpertSlotProp,
	msgProp,
	nameProp,
	tooltipAlignProp,
	touchedProp,
} from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

/**
 * Props every form field has, with the same type and default. A field's own config spreads these
 * in; props only some fields have (e.g. `accessKey`, `required`) stay in the field's config, because
 * `WebComponentInterface` requires a watcher for every config prop.
 */
export const formFieldBasePropsConfig = {
	required: [labelWithExpertSlotProp],
	optional: [
		ariaDetailsProp,
		disabledProp,
		hideLabelProp,
		hideMsgProp,
		hintProp,
		infoPopoverProp,
		inputCallbacksProp,
		msgProp,
		nameProp,
		tooltipAlignProp,
		touchedProp,
	],
} as const satisfies PropsConfigShape;

export type FormFieldBaseStates = {
	/** Base ID of the field; the IDs of label, hint, message and datalist derive from it. */
	id: string;
	/** Whether the native control has the focus; a touched message is announced as alert only without it. */
	inputHasFocus: boolean;
};

export type FormFieldBaseApi = ApiFromConfig<typeof formFieldBasePropsConfig, { States: FormFieldBaseStates }>;
