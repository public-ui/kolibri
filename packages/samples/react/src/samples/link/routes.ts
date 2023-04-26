import { Routes } from '../../shares/types';

import { LinkBasic } from './basic';

import { LinkIcons } from './icons';

import { LinkImage } from './image';

import { LinkTarget } from './target';

export const LINK_ROUTES: Routes = {
	link: {
		basic: LinkBasic,
		icons: LinkIcons,
		image: LinkImage,
		target: LinkTarget,
	},
};
