import { Generic } from '@a11y-ui/core';

import { PropAlternativeButtonLinkRole } from '../../types/props/alternative-button-link-role';
import { ButtonCallbacksPropType } from '../../types/props/button-callbacks';
import { PropButtonVariant } from '../../types/props/button-variant';
import { PropIcon } from '../../types/props/icon';
import { PropLabel } from '../../types/props/label';
import { PropShow } from '../../types/props/show';
import { PropTooltipAlign } from '../../types/props/tooltip-align';
import { StencilUnknown } from '../../types/unknown';

type RequiredProps = PropLabel;
type OptionalProps = {
	on?: ButtonCallbacksPropType<StencilUnknown>;
	/**
	 * @deprecated Use `_show` instead.
	 */
	showDropdown: boolean;
} & PropAlternativeButtonLinkRole &
	PropIcon &
	PropShow &
	PropTooltipAlign &
	PropButtonVariant;

type RequiredStates = PropShow;
type OptionalStates = NonNullable<unknown>;

type RequiredWatchers = RequiredStates;
type OptionalWatchers = OptionalStates;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.Component &
	Generic.Element.Members<RequiredProps, OptionalProps> &
	Generic.Element.Watchers<RequiredWatchers, OptionalWatchers> & {
		readonly state: Generic.Element.Members<RequiredStates, OptionalStates>;
	};
