import { Routes } from '../../shares/types';

import { NavAriaCurrent } from './aria-current';

import { NavBasic } from './basic';

import { NavHorizontal } from './horizontal';

export const NAV_ROUTES: Routes = {
	nav: {
		basic: NavBasic,
		'aria-current': NavAriaCurrent,
		horizontal: NavHorizontal,
	},
};
