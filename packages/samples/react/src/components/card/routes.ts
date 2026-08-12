import type { Routes } from '../../shares/types';
import { CardBasic } from './basic';
import { CardHeadlines } from './headlines';
import { CardLinked } from './linked';

export const CARD_ROUTES: Routes = {
	card: {
		basic: CardBasic,
		headlines: CardHeadlines,
		linked: CardLinked,
	},
};
