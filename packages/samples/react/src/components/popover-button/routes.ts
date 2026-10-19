import type { Routes } from '../../shares/types';
import { PopoverButtonAlign } from './align';
import { PopoverButtonBasic } from './basic';
import { PopoverButtonInline } from './inline';

export const POPOVER_BUTTON_ROUTES: Routes = {
	'popover-button': {
		align: PopoverButtonAlign,
		basic: PopoverButtonBasic,
		inline: PopoverButtonInline,
	},
};
