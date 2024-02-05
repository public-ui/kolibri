import React, { FC } from 'react';
import { KolLinkGroup } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

const links = [
	{ _label: 'Link 1', _href: 'https://www.w3.org' },
	{ _label: 'Link 2', _href: 'https://www.w3.org' },
	{ _label: 'Link 3', _href: 'https://www.w3.org' },
];
export const LinkGroupBasic: FC = () => (
	<>
		<SampleDescription>
			<p>Hier ist eine LinkGroup bestehend aus drei Links die zu https://www.w3.org/ weiterleiten.</p>
		</SampleDescription>
		<KolLinkGroup _links={links} _label="" />
	</>
);
