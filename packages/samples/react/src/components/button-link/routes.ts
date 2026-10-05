import type { Routes } from '../../shares/types';
import { ButtonLinkAriaDescription } from './aria-description';
import { ButtonLinkBasic } from './basic';
import { ButtonLinkIcons } from './icons';

export const BUTTON_LINK_ROUTES: Routes = {
	'button-link': {
		basic: ButtonLinkBasic,
		icons: ButtonLinkIcons,
		'aria-description': ButtonLinkAriaDescription,
	},
};
