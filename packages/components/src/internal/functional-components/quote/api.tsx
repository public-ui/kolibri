import { hrefProp, labelProp, quoteProp, variantQuoteProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

export const quotePropsConfig = {
	optional: [labelProp, variantQuoteProp],
	required: [hrefProp, quoteProp],
} as const satisfies PropsConfigShape;

export type QuoteApi = ApiFromConfig<typeof quotePropsConfig>;
