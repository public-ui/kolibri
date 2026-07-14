import type { Generic } from 'adopted-style-sheets';

import type {
	ButtonCallbacksPropType,
	PropAlternativeButtonLinkRole,
	PropDisabled,
	PropHideLabel,
	PropIcons,
	PropLabel,
	PropName,
	PropShow,
	PropTooltipAlign,
	PropVariantClassName,
} from '../props';
import type { StencilUnknown } from '../types';

type RequiredProps = PropLabel;
type OptionalProps = {
	on?: ButtonCallbacksPropType<StencilUnknown>;
} & PropDisabled &
	PropHideLabel &
	PropAlternativeButtonLinkRole &
	PropIcons &
	PropTooltipAlign &
	PropVariantClassName &
	PropName;

type RequiredStates = PropShow;
type OptionalStates = NonNullable<unknown>;

export type SplitButtonProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type SplitButtonStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type SplitButtonAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
