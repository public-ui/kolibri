import { Generic } from '@a11y-ui/core';
import { PropAlternativeButtonLinkRole } from '../../types/props/alternative-button-link-role';
import { PropAriaCurrent } from '../../types/props/aria-current';
import { PropDownload } from '../../types/props/download';
import { PropHref } from '../../types/props/href';
import { PropIcons } from '../../types/props/icons';
import { PropLabelWithExpertSlot } from '../../types/props/label';
import { PropLinkOnCallbacks } from '../../types/props/link-on-callbacks';
import { PropLinkTarget } from '../../types/props/link-target';
import { PropTooltipAlign } from '../../types/props/tooltip-align';
import { PropHideLabel } from '../../types/props/hide-label';
import { PropAccessKey } from '../../types/props/access-key';

/**
 * https://twitter.com/housecor/status/1541037184622403584?t=HoUiOAZEcXFeuDl-VWAEZg
 * https://mui.com/material-ui/react-link/#accessibility
 * https://mui.com/material-ui/react-button/#text-button
 */
export type RequiredProps = PropHref;
export type OptionalProps = {
	targetDescription: string;
	tabIndex: number;
} & PropAccessKey &
	PropAlternativeButtonLinkRole &
	PropDownload &
	PropHideLabel &
	PropIcons &
	PropLabelWithExpertSlot &
	PropLinkOnCallbacks &
	PropLinkTarget &
	PropTooltipAlign;
export type LinkProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = PropIcons & PropHref;
type OptionalStates = PropAriaCurrent & Omit<RequiredProps & OptionalProps, keyof RequiredStates> & PropLabelWithExpertSlot;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
