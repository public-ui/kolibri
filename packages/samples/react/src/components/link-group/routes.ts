import { Routes } from '../../shares/types';
import { LinkGroupBasic } from './basic';
import { LinkGroupHorizontal } from './horizontal';

export const LINK_GROUP_ROUTES: Routes = {
	'link-group': {
		basic: LinkGroupBasic,
		horizontal: LinkGroupHorizontal,
	},
};
