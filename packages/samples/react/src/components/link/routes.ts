import type { Routes } from '../../shares/types';
import { LinkAccessKey } from './access-key';
import { LinkAriaDescription } from './aria-description';
import { LinkBasic } from './basic';
import { LinkIcons } from './icons';
import { LinkImage } from './image';
import { LinkReactRouter } from './link-react-router';
import { LinkHeadline } from './linked-headline';
import { LinkShortKey } from './short-key';
import { LinkTarget } from './target';
import { LinkVariant } from './variant';

export const LINK_ROUTES: Routes = {
	link: {
		basic: LinkBasic,
		icons: LinkIcons,
		image: LinkImage,
		target: LinkTarget,
		'aria-description': LinkAriaDescription,
		'access-key': LinkAccessKey,
		'short-key': LinkShortKey,
		'react-router': LinkReactRouter,
		'linked-headline': LinkHeadline,
		'link-variant': LinkVariant,
	},
};
