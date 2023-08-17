import { PropHref } from '../../types/props/href';
import { PropDownload } from '../../types/props/download';
import { PropLabelWithExpertSlot } from '../../types/props/label';
import { PropAriaCurrent, PropListenAriaCurrent } from '../../types/props/aria-current';
import { PropStealth } from '../../types/props/stealth';
import { PropLinkTarget } from '../../types/props/link-target';
import { Generic } from '@a11y-ui/core';
import { LinkOnCallbacks, LinkUseCase } from '../../types/button-link';
import { PropTooltipAlign } from '../../types/props/tooltip-align';
import { PropAriaExpanded } from '../../types/props/aria-expanded';
import { AlignPropType } from '../../types/props/align';
import { PropAriaLabel } from '../../types/props/aria-label';
import { PropHideLabel } from '../../types/props/hide-label';
import { PropAlternativeButtonLinkRole } from '../../types/props/alternative-button-link-role';
import { PropDisabled } from '../../types/props/disabled';
import { PropAriaControls } from '../../types/props/aria-controls';
import { PropAriaSelected } from '../../types/props/aria-selected';
import { PropIcon } from '../../types/props/icon';

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
	 * @deprecated Das Styling sollte stets über CSS erfolgen.
	 */
	useCase: LinkUseCase;
	/**
	 * @deprecated
	 */
	on: LinkOnCallbacks;
} & PropAlternativeButtonLinkRole &
	PropAriaControls &
	PropAriaCurrent &
	PropAriaExpanded &
	PropAriaLabel &
	PropAriaSelected &
	PropDisabled &
	PropDownload &
	PropHideLabel &
	PropIcon &
	PropLabelWithExpertSlot &
	PropLinkTarget &
	PropListenAriaCurrent &
	PropStealth &
	PropTooltipAlign;
export type LinkProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = PropIcon & PropHref & PropLabelWithExpertSlot;
type OptionalStates = Omit<RequiredProps & OptionalProps, keyof RequiredStates>;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
