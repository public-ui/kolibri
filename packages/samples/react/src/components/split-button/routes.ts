import { Routes } from '../../shares/types';
import { SplitButtonBasic } from './basic';
import { SplitButtonWithContext } from './with-context';

export const SPLIT_BUTTON_ROUTES: Routes = {
	'split-button': {
		basic: SplitButtonBasic,
		'with-context': SplitButtonWithContext,
	},
};
