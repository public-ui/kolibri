import { hrefProp } from '../../props/href';
import { labelLangSegmentsProp } from '../../props/label-lang-segment';
import { quoteProp } from '../../props/quote';
import { variantQuoteProp } from '../../props/variant-quote';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const quotePropsConfig = {
	optional: [labelLangSegmentsProp, variantQuoteProp],
	required: [hrefProp, quoteProp],
} as const satisfies PropsConfigShape;

export type QuoteApi = ApiFromConfig<typeof quotePropsConfig>;
