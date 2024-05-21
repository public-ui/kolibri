import { Routes } from '../../shares/types';
import { ToolbarBasic } from './basic';
import { ToolbarDisabled } from './disabled';

export const TOOLBAR_ROUTES: Routes = {
	toolbar: {
		basic: ToolbarBasic,
		disabled: ToolbarDisabled,
	},
};
