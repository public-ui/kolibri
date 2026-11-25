import type { Routes } from '../../shares/types';
import { TabsAlign } from './align';
import { TabsBasic } from './basic';
import { TabsBehavior } from './behavior';
import { CreateButton } from './create-button';
import { TabsIconsOnly } from './icons-only';
import { TabsVariant } from './variant';

export const TABS_ROUTES: Routes = {
	tabs: {
		basic: TabsBasic,
		variant: TabsVariant,
		'create-button': CreateButton,
		'icons-only': TabsIconsOnly,
		behavior: TabsBehavior,
		align: TabsAlign,
	},
};
