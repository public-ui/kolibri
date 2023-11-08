import { Routes } from '../../shares/types';

import { NavActive } from './active';

import { NavAriaCurrent } from './aria-current';

import { NavBasic } from './basic';

import { NavHorizontal } from './horizontal';

export const NAV_ROUTES: Routes = {
	nav: {
		basic: NavBasic,
		active: NavActive,
		'aria-current': NavAriaCurrent,
		horizontal: NavHorizontal,
	},
};
