import type { Routes } from '../../shares/types';
import { PopoverButtonBasic } from './basic';
import { PopoverButtonInline } from './inline';

export const POPOVER_BUTTON_ROUTES: Routes = {
	'popover-button': {
		basic: PopoverButtonBasic,
		inline: PopoverButtonInline,
	},
};
