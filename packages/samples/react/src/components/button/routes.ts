import { Routes } from '../../shares/types';
import { ButtonAccessKey } from './access-key';
import { ButtonAriaDescription } from './aria-description';
import { ButtonBaselined } from './baselined';
import { ButtonBasic } from './basic';
import { ButtonIcons } from './icons';
import { ButtonWidth } from './width';
import { ButtonShortKey } from './short-key';

export const BUTTON_ROUTES: Routes = {
	button: {
		basic: ButtonBasic,
		icons: ButtonIcons,
		width: ButtonWidth,
		'access-key': ButtonAccessKey,
		'aria-description': ButtonAriaDescription,
		baselined: ButtonBaselined,
		'short-key': ButtonShortKey,
	},
};
