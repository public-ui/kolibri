import type { Routes } from '../../shares/types';
import { ToastBasic } from './basic';
import { ToastConfigurator } from './configurator';

export const TOAST_ROUTES: Routes = {
	toast: {
		basic: ToastBasic,
		configurator: ToastConfigurator,
	},
};
