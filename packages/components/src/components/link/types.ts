import type { Generic } from 'adopted-style-sheets';
import { PropAlternativeButtonLinkRole } from '../../types/props/alternative-button-link-role';
import { PropAriaCurrentValue } from '../../types/props/aria-current-value';
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
	tabIndex: number;
} & PropAccessKey &
	PropAriaCurrentValue &
	PropAlternativeButtonLinkRole &
	PropDownload &
	PropHideLabel &
	PropIcons &
	PropLabelWithExpertSlot &
	PropLinkOnCallbacks &
	PropLinkTarget &
	PropTooltipAlign;
export type LinkProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = PropAriaCurrentValue & PropIcons & PropHref;
type OptionalStates = { ariaCurrent: string } & Omit<RequiredProps & OptionalProps, keyof RequiredStates>;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
