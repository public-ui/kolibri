import type { Routes } from '../../shares/types';
import { CardBasic } from './basic';
import { CardHeadlines } from './headlines';

export const CARD_ROUTES: Routes = {
	card: {
		basic: CardBasic,
		headlines: CardHeadlines,
	},
};
