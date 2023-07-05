import { Generic } from '@a11y-ui/core';
import { KoliBriIconProp, Stringified } from '../../components';
import { PropHideLabel, PropLabel } from '../../types/props';
import { KoliBriCustomIcon } from '../../types/icon';

type RequiredProps = PropLabel;
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
} & PropLabel;
type OptionalStates = {
	/**
	 * @deprecated use _hide-label
	 */
	iconOnly: boolean;
} & PropHideLabel;

export type KolibriSpanStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KolibriSpanAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
