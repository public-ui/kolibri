import { Routes } from '../../shares/types';
import { ComboboxBasic } from './basic';
import { ComboboxHtml } from './html';

export const COMBOBOX_ROUTES: Routes = {
	combobox: {
		basic: ComboboxBasic,
		html: ComboboxHtml,
	},
};
