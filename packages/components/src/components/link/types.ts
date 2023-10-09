import { Generic } from '@a11y-ui/core';

import { AlignPropType } from '../../types/props/align';
import { PropAlternativeButtonLinkRole } from '../../types/props/alternative-button-link-role';
import { PropAriaControls } from '../../types/props/aria-controls';
import { PropAriaCurrent, PropListenAriaCurrent } from '../../types/props/aria-current';
import { PropAriaExpanded } from '../../types/props/aria-expanded';
import { PropAriaLabel } from '../../types/props/aria-label';
import { PropAriaSelected } from '../../types/props/aria-selected';
import { PropDisabled } from '../../types/props/disabled';
import { PropDownload } from '../../types/props/download';
import { PropHideLabel } from '../../types/props/hide-label';
import { PropHref } from '../../types/props/href';
import { IconsPropType, PropIcons } from '../../types/props/icons';
import { PropLabelWithExpertSlot } from '../../types/props/label';
import { PropLinkOnCallbacks } from '../../types/props/link-on-callbacks';
import { PropLinkTarget } from '../../types/props/link-target';
import { PropStealth } from '../../types/props/stealth';
import { PropTooltipAlign } from '../../types/props/tooltip-align';

/**
 * https://twitter.com/housecor/status/1541037184622403584?t=HoUiOAZEcXFeuDl-VWAEZg
 * https://mui.com/material-ui/react-link/#accessibility
 * https://mui.com/material-ui/react-button/#text-button
 */
export type RequiredProps = PropHref;
export type OptionalProps = {
	targetDescription: string;
	tabIndex: number;
	/**
	 * @deprecated
	 */
	iconAlign: AlignPropType;
	/**
	 * @deprecated
	 */
	iconOnly: boolean;
	/**
	 * @deprecated Das Styling sollte stets über CSS erfolgen.
	 */
	selector: string;

	/**
	 * @deprecated
	 */
	icon: IconsPropType;
} & PropAlternativeButtonLinkRole &
	PropAriaControls &
	PropAriaCurrent &
	PropAriaExpanded &
	PropAriaLabel &
	PropAriaSelected &
	PropDisabled &
	PropDownload &
	PropHideLabel &
	PropIcons &
	PropLabelWithExpertSlot &
	PropLinkOnCallbacks &
	PropLinkTarget &
	PropListenAriaCurrent &
	PropStealth &
	PropTooltipAlign;
export type LinkProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = PropIcons & PropHref;
type OptionalStates = Omit<RequiredProps & OptionalProps, keyof RequiredStates> & PropLabelWithExpertSlot;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
