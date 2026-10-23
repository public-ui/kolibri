import { hrefProp } from '../../props/href';
import { labelProp } from '../../props/label';
import { quoteProp } from '../../props/quote';
import { variantQuoteProp } from '../../props/variant-quote';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const quotePropsConfig = {
	optional: [labelProp, variantQuoteProp],
	required: [hrefProp, quoteProp],
} as const satisfies PropsConfigShape;

export type QuoteApi = ApiFromConfig<typeof quotePropsConfig>;
