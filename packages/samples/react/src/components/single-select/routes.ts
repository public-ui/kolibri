import { Routes } from '../../shares/types';
import { SingleSelectBasic } from './basic';
import { SingleSelectHideLabel } from './hide-label';

export const SINGLE_SELECT_ROUTES: Routes = {
	'single-select': {
		basic: SingleSelectBasic,
		'hide-label': SingleSelectHideLabel,
	},
};
