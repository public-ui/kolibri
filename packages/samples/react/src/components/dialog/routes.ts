import type { Routes } from '../../shares/types';
import { DialogBasic } from './basic';
import { DialogWithAlert } from './with-alert';

export const DIALOG_ROUTES: Routes = {
	dialog: {
		basic: DialogBasic,
		'with-alert': DialogWithAlert,
	},
};
