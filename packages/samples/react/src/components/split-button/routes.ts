import { Routes } from '../../shares/types';
import { SplitButtonBasic } from './basic';
import { SplitButtonLoginForm } from './login-form';
import { SplitButtonSettingsMenu } from './settings-menu';
import { SplitButtonToolbarHorizontal } from './toolbar-horizontal';

export const SPLIT_BUTTON_ROUTES: Routes = {
	'split-button': {
		basic: SplitButtonBasic,
		'toolbar-horizontal': SplitButtonToolbarHorizontal,
		'login-form': SplitButtonLoginForm,
		'settings-menu': SplitButtonSettingsMenu,
	},
};
