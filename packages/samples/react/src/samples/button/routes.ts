import { Routes } from '../../shares/types';

import { ButtonBasic } from './basic';

import { ButtonIconOnly } from './hide-label';

import { ButtonIcons } from './icons';

import { ButtonWidth } from './width';

export const BUTTON_ROUTES: Routes = {
	button: {
		basic: ButtonBasic,
		'hide-label': ButtonIconOnly,
		icons: ButtonIcons,
		width: ButtonWidth,
	},
};
