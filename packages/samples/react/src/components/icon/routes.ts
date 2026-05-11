import type { Routes } from '../../shares/types';
import { IconAllKolicons } from './all-kolicons';
import { IconBasic } from './basic';
import { IconFont } from './font';

export const ICON_ROUTES: Routes = {
	icon: {
		basic: IconBasic,
		'all-kolicons': IconAllKolicons,
		font: IconFont,
	},
};
