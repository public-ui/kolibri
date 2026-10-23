import { ariaDetailsProp } from '../../props/aria-details';
import { disabledProp } from '../../props/disabled';
import { hideLabelProp } from '../../props/hide-label';
import { hideMsgProp } from '../../props/hide-msg';
import { hintProp } from '../../props/hint';
import { infoPopoverProp } from '../../props/info-popover';
import { inputCallbacksProp } from '../../props/input-callbacks';
import { labelWithExpertSlotProp } from '../../props/label-with-expert-slot';
import { msgProp } from '../../props/msg';
import { nameProp } from '../../props/name';
import { tooltipAlignProp } from '../../props/tooltip-align';
import { touchedProp } from '../../props/touched';
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
