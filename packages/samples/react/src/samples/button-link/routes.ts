import { Routes } from '../../shares/types';

import { ButtonLinkBasic } from './basic';

import { ButtonLinkIcons } from './icons';

import { ButtonLinkImage } from './image';

import { ButtonLinkTarget } from './target';

export const BUTTON_LINK_ROUTES: Routes = {
	'button-link': {
		basic: ButtonLinkBasic,
		icons: ButtonLinkIcons,
		image: ButtonLinkImage,
		target: ButtonLinkTarget,
	},
};
