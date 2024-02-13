import { Routes } from '../../shares/types';
import { QuoteBasic } from './basic';
import { QuoteBlock } from './block';

export const QUOTE_ROUTES: Routes = {
	quote: {
		basic: QuoteBasic,
		block: QuoteBlock,
	},
};
