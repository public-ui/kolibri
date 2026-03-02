import type { HrefProp, LabelProp, QuoteProp, VariantQuoteProp } from '../../props';
import type { ComponentApi } from '../generic-types';

export interface QuoteApi extends ComponentApi {
	Props: {
		Optional: LabelProp & VariantQuoteProp;
		Required: HrefProp & QuoteProp;
	};
}
