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
import type { Members } from '../types/members';

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

export type SplitButtonProps = Members<RequiredProps, OptionalProps>;
