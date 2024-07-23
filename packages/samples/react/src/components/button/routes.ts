import { Routes } from '../../shares/types';
import { ButtonAccessKey } from './access-key';
import { ButtonBaselined } from './baselined';
import { ButtonBasic } from './basic';
import { ButtonIcons } from './icons';
import { ButtonWidth } from './width';

export const BUTTON_ROUTES: Routes = {
	button: {
		basic: ButtonBasic,
		icons: ButtonIcons,
		width: ButtonWidth,
		'access-key': ButtonAccessKey,
		baselined: ButtonBaselined,
	},
};
