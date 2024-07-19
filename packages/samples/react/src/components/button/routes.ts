import { Routes } from '../../shares/types';

import { ButtonBasic } from './basic';

import { ButtonIcons } from './icons';

import { ButtonWidth } from './width';

export const BUTTON_ROUTES: Routes = {
	button: {
		basic: ButtonBasic,
		icons: ButtonIcons,
		width: ButtonWidth,
	},
};
