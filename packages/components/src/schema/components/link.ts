import type { Generic } from 'adopted-style-sheets';
import type {
	PropAccessKey,
	PropAlternativeButtonLinkRole,
	PropAriaControls,
	PropAriaCurrentValue,
	PropAriaDescription,
	PropAriaExpanded,
	PropAriaOwns,
	PropCustomClass,
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
	VariantClassNamePropType,
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

type RequiredStates = PropAriaCurrentValue & PropIcons & PropHref;
type OptionalStates = { ariaCurrent: string } & PropAriaExpanded &
	PropAriaOwns &
	PropCustomClass &
	Omit<RequiredProps & OptionalProps, keyof RequiredStates> & {
		variant: VariantClassNamePropType;
	};

export type LinkProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type LinkStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type LinkAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
export type InternalLinkAPI = Omit<LinkAPI, 'validateVariant'>;
