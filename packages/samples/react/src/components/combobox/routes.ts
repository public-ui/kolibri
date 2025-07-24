import { Routes } from '../../shares/types';
import { ComboboxBasic } from './basic';
import { ComboboxHideLabel } from './hide-label';

export const COMBOBOX_ROUTES: Routes = {
	combobox: {
		basic: ComboboxBasic,
		'hide-label': ComboboxHideLabel,
	},
};
