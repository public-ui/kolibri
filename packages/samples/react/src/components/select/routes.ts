import { Routes } from '../../shares/types';
import { SelectBasic } from './basic';
import { SelectHideLabel } from './hide-label';

export const SELECT_ROUTES: Routes = {
	select: {
		basic: SelectBasic,
		'hide-label': SelectHideLabel,
	},
};
