import type { Routes } from '../../shares/types';
import { DialogBasic } from './basic';
import { DialogScrollLock } from './scroll-lock';
import { DialogWithAlert } from './with-alert';

export const DIALOG_ROUTES: Routes = {
	dialog: {
		basic: DialogBasic,
		'scroll-lock': DialogScrollLock,
		'with-alert': DialogWithAlert,
	},
};
