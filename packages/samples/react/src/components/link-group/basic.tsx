import type { FC } from 'react';
import React from 'react';

import { KolLinkGroup } from '@public-ui/react';

const links = [
	{ _label: 'Link 1', _href: '#/sample-page' },
	{ _label: 'Link 2', _href: '#/sample-page' },
	{ _label: 'Link 3', _href: '#/sample-page' },
];
export const LinkGroupBasic: FC = () => <KolLinkGroup _links={links} _label="" />;
