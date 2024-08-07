import { Routes } from '../../shares/types';
import { LinkButtonBasic } from './basic';
import { LinkButtonAriaDescription } from './aria-description';

export const LINK_BUTTON_ROUTES: Routes = {
	'link-button': {
		basic: LinkButtonBasic,
		'aria-description': LinkButtonAriaDescription,
	},
};
