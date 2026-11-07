import type { Generic } from 'adopted-style-sheets';

import type { QuoteVariantType } from '../../internal/props';
import type { HrefPropType, LabelLangSegmentsPropType, QuotePropType } from '../props';

type RequiredQuoteProps = {
	href: HrefPropType;
	quote: QuotePropType;
};
type OptionalQuoteProps = {
	label: LabelLangSegmentsPropType;
	variant: QuoteVariantType;
};

export type QuoteProps = Generic.Element.Members<RequiredQuoteProps, OptionalQuoteProps>;
