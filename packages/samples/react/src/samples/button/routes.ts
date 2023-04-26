import { Routes } from '../../shares/types';

import { ButtonBasic } from './basic';

import { ButtonIconOnly } from './icon-only';

import { ButtonIcons } from './icons';

import { ButtonWidth } from './width';

export const BUTTON_ROUTES: Routes = {
	button: {
		basic: ButtonBasic,
		'icon-only': ButtonIconOnly,
		icons: ButtonIcons,
		width: ButtonWidth,
	},
};
