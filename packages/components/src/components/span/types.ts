import { Generic } from '@a11y-ui/core';

import { Stringified } from '../../types/common';
import { KoliBriCustomIcon, KoliBriIconProp } from '../../types/icon';
import { PropHideLabel } from '../../types/props/hide-label';
import { PropLabelWithExpertSlot } from '../../types/props/label';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	icon: Stringified<KoliBriIconProp>;
	/**
	 * @deprecated use _hide-label
	 */
	iconOnly: boolean;
} & PropHideLabel;
export type KolibriSpanProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	icon: {
		top?: KoliBriCustomIcon;
		right?: KoliBriCustomIcon;
		bottom?: KoliBriCustomIcon;
		left?: KoliBriCustomIcon;
	};
} & PropLabelWithExpertSlot;
type OptionalStates = {
	/**
	 * @deprecated use _hide-label
	 */
	iconOnly: boolean;
} & PropHideLabel;

export type KolibriSpanStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KolibriSpanAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
