import { Routes } from '../../shares/types';

import { ButtonBasic } from './basic';

import { ButtonIconOnly } from './hide-label';

import { ButtonIcons } from './icons';

import { ButtonWidth } from './width';
import { ButtonAccessKey } from './access-key';
import { ButtonBaselined } from './button-baselined';

export const BUTTON_ROUTES: Routes = {
	button: {
		basic: ButtonBasic,
		'hide-label': ButtonIconOnly,
		icons: ButtonIcons,
		width: ButtonWidth,
		'access-key': ButtonAccessKey,
		'button-baselined': ButtonBaselined,
	},
};
