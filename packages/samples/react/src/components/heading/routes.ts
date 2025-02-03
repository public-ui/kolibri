import { Routes } from '../../shares/types';
import { HeadingBadged } from './badged';
import { HeadingBasic } from './basic';
import { HeadingParagraph } from './paragraph';

export const HEADING_ROUTES: Routes = {
	heading: {
		basic: HeadingBasic,
		badge: HeadingBadged,
		paragraph: HeadingParagraph,
	},
};
