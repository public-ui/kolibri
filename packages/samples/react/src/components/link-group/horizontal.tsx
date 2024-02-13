import type { FC } from 'react';
import React from 'react';

import { KolLinkGroup } from '@public-ui/react';

const links = [
	{ _label: 'Link 1', _href: '#/back-page' },
	{ _label: 'Link 2', _href: '#/back-page' },
	{ _label: 'Link 3', _href: '#/back-page' },
];
export const LinkGroupHorizontal: FC = () => <KolLinkGroup _links={links} _orientation="horizontal" _label="" />;
