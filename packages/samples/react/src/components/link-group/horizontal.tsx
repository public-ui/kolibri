import type { FC } from 'react';
import React from 'react';

import { KolBadge, KolLinkGroup } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

const links = [
	{ _label: 'Link 1', _href: '#/back-page' },
	{ _label: 'Link 2', _href: '#/back-page' },
	{ _label: 'Link 3', _href: '#/back-page' },
];
export const LinkGroupHorizontal: FC = () => (
	<>
		<SampleDescription>
			<p>KolLinkGroup renders a list of the given links. This sample shows the horizontal alignment.</p>
			<p>
				<KolBadge _label="The component is deprecated and won't be available anymore in KoliBri version 3." _color="#db5461" />
			</p>
		</SampleDescription>

		<KolLinkGroup _links={links} _orientation="horizontal" _label="" />
	</>
);
