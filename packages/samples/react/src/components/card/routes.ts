import { Routes } from '../../shares/types';
import { CardBasic } from './basic';
import { CardConfirm } from './confirm';
import { CardFlex } from './flex';
import { CardSelection } from './selection';
import { SampleDescription } from '../SampleDescription';

export const CARD_ROUTES: Routes = {
	//SYNTAXERROR
	card: {
		basic: CardBasic,
		confirm: CardConfirm,
		flex: CardFlex,
		selection: CardSelection,
	},
};
