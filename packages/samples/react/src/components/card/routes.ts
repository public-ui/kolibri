import type { Routes } from '../../shares/types';
import { CardBasic } from './basic';
import { CardCloserCallback } from './closer-callback';
import { CardHeadlines } from './headlines';
import { CardLinked } from './linked';

export const CARD_ROUTES: Routes = {
	card: {
		basic: CardBasic,
		'closer-callback': CardCloserCallback,
		headlines: CardHeadlines,
		linked: CardLinked,
	},
};
