import { Routes } from '../../shares/types';
import { ButtonLinkBasic } from './basic';
import { ButtonLinkIcons } from './icons';
import { ButtonLinkImage } from './image';
import { ButtonLinkAriaDescription } from './aria-description';

export const BUTTON_LINK_ROUTES: Routes = {
	'button-link': {
		basic: ButtonLinkBasic,
		icons: ButtonLinkIcons,
		image: ButtonLinkImage,
		'aria-description': ButtonLinkAriaDescription,
	},
};
