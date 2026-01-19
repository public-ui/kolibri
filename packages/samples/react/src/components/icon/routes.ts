import { Routes } from '../../shares/types';
import { IconAllKolicons } from './all-kolicons';
import { IconBasic } from './basic';
import { IconFontAwesome } from './font-awesome';

export const ICON_ROUTES: Routes = {
	icon: {
		basic: IconBasic,
		'all-kolicons': IconAllKolicons,
		'font-awesome': IconFontAwesome,
	},
};
