import type { Generic } from 'adopted-style-sheets';

import type {
	ButtonCallbacksPropType,
	PropAlternativeButtonLinkRole,
	PropDisabled,
	PropHideLabel,
	PropIcons,
	PropLabel,
	PropName,
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

export type SplitButtonProps = Generic.Element.Members<RequiredProps, OptionalProps>;
