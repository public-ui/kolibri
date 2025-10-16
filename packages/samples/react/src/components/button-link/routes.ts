import { Routes } from '../../shares/types';
import { ButtonLinkAriaDescription } from './aria-description';
import { ButtonLinkBasic } from './basic';
import { ButtonLinkIcons } from './icons';
import { ButtonLinkImage } from './image';

export const BUTTON_LINK_ROUTES: Routes = {
	'button-link': {
		basic: ButtonLinkBasic,
		icons: ButtonLinkIcons,
		image: ButtonLinkImage,
		'aria-description': ButtonLinkAriaDescription,
	},
};
