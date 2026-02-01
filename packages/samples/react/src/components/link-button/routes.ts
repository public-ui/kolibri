import type { Routes } from '../../shares/types';
import { LinkButtonAriaDescription } from './aria-description';
import { LinkButtonBasic } from './basic';

export const LINK_BUTTON_ROUTES: Routes = {
	'link-button': {
		basic: LinkButtonBasic,
		'aria-description': LinkButtonAriaDescription,
	},
};
