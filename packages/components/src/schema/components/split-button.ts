import type { Generic } from 'adopted-style-sheets';

import type {
	ButtonCallbacksPropType,
	PropAlternativeButtonLinkRole,
	PropDisabled,
	PropHideLabel,
	PropIcons,
	PropLabelLangSegments,
	PropName,
	PropTooltipAlign,
	PropVariantClassName,
} from '../props';
import type { StencilUnknown } from '../types';

type RequiredProps = PropLabelLangSegments;
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
