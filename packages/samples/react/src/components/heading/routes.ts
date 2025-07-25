import { Routes } from '../../shares/types';
import { HeadingBadged } from './badged';
import { HeadingBasic } from './basic';
import { HeadingParagraph } from './paragraph';
import { HeadingSecondary } from './secondary';

export const HEADING_ROUTES: Routes = {
	heading: {
		basic: HeadingBasic,
		badge: HeadingBadged,
		paragraph: HeadingParagraph,
		secondary: HeadingSecondary,
	},
};
