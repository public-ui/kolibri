import { Generic } from '@a11y-ui/core';

import { StencilUnknown } from '../../components';
import { PropAlternativeButtonLinkRole } from '../../types/props/alternative-button-link-role';
import { ButtonCallbacksPropType } from '../../types/props/button-callbacks';
import { PropButtonVariant } from '../../types/props/button-variant';
import { PropIcons } from '../../types/props/icons';
import { PropLabel } from '../../types/props/label';
import { PropTooltipAlign } from '../../types/props/tooltip-align';
import { PropShow } from '../../types/props/show';

type RequiredProps = PropLabel;
type OptionalProps = {
	on?: ButtonCallbacksPropType<StencilUnknown>;
} & PropAlternativeButtonLinkRole &
	PropIcons &
	PropTooltipAlign &
	PropButtonVariant;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = PropShow;
type OptionalStates = NonNullable<unknown>;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
