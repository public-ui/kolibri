import type { Generic } from 'adopted-style-sheets';
import type {
	PropAccessKey,
	PropAlternativeButtonLinkRole,
	PropAriaCurrentValue,
	PropAriaExpanded,
	PropAriaOwns,
	PropDisabled,
	PropDownload,
	PropHideLabel,
	PropHref,
	PropIcons,
	PropLabelWithExpertSlot,
	PropLinkOnCallbacks,
	PropLinkTarget,
	PropTooltipAlign,
} from '../props';

/**
 * https://twitter.com/housecor/status/1541037184622403584?t=HoUiOAZEcXFeuDl-VWAEZg
 * https://mui.com/material-ui/react-link/#accessibility
 * https://mui.com/material-ui/react-button/#text-button
 */
export type RequiredProps = PropHref;
export type OptionalProps = {
	tabIndex: number;
} & PropAccessKey &
	PropAlternativeButtonLinkRole &
	PropAriaCurrentValue &
	PropDisabled &
	PropDownload &
	PropHideLabel &
	PropIcons &
	PropLabelWithExpertSlot &
	PropLinkOnCallbacks &
	PropLinkTarget &
	PropTooltipAlign;

type RequiredStates = PropAriaCurrentValue & PropIcons & PropHref;
type OptionalStates = { ariaCurrent: string } & PropAriaExpanded & PropAriaOwns & Omit<RequiredProps & OptionalProps, keyof RequiredStates>;

export type LinkProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type LinkStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type LinkAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
