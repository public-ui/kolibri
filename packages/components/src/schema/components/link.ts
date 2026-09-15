import type { Generic } from 'adopted-style-sheets';
import type {
	PropAccessKey,
	PropAlternativeButtonLinkRole,
	PropAriaControls,
	PropAriaCurrentValue,
	PropAriaDescription,
	PropDisabled,
	PropDownload,
	PropHideLabel,
	PropHref,
	PropIcons,
	PropInline,
	PropLabelWithExpertSlot,
	PropLinkOnCallbacks,
	PropLinkTarget,
	PropShortKey,
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
	PropAriaControls &
	PropAriaDescription &
	PropDisabled &
	PropDownload &
	PropHideLabel &
	PropIcons &
	PropInline &
	PropLabelWithExpertSlot &
	PropLinkOnCallbacks &
	PropLinkTarget &
	PropShortKey &
	PropTooltipAlign;

export type LinkProps = Generic.Element.Members<RequiredProps, OptionalProps>;
