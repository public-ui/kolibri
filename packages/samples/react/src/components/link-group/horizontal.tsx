import React, { FC } from 'react';
import { KolLinkGroup } from '@public-ui/react';

const links = [
	{ _label: 'Link 1', _href: 'https://www.w3.org' },
	{ _label: 'Link 2', _href: 'https://www.w3.org' },
	{ _label: 'Link 3', _href: 'https://www.w3.org' },
];
export const LinkGroupHorizontal: FC = () => <KolLinkGroup _links={links} _orientation="horizontal" _label="" />;
