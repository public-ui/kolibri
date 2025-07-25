import { Routes } from '../../shares/types';
import { TabsBasic } from './basic';
import { TabsAlign } from './align';
import { TabsIconsOnly } from './icons-only';
import { TabsBehavior } from './behavior';
import { CreateButton } from './create-button';

export const TABS_ROUTES: Routes = {
	tabs: {
		basic: TabsBasic,
		'create-button': CreateButton,
		'icons-only': TabsIconsOnly,
		behavior: TabsBehavior,
		align: TabsAlign,
	},
};
