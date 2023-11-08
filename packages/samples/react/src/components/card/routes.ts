import { Routes } from '../../shares/types';

import { CardBasic } from './basic';

import { CardConfirm } from './confirm';

import { CardFlex } from './flex';

import { CardSelection } from './selection';

export const CARD_ROUTES: Routes = {
	card: {
		basic: CardBasic,
		confirm: CardConfirm,
		flex: CardFlex,
		selection: CardSelection,
	},
};
