import React from 'react';

import { KolNav } from '@public-ui/react';

import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';
export const NavAriaCurrent: FC = () => (
	<>
		<SampleDescription>
			<p>
				This sample shows KolNav with a link to the current page. This makes the component automatically assign <code>aria-current=&quot;page&quot;</code>
				to it.
			</p>
		</SampleDescription>

		<KolNav
			class="block w-sm"
			_label="Main navigation"
			_links={[
				{
					_label: 'Homepage',
					_href: '#/back-page',
				},
				{
					_label: 'Nav - aria-current (Current page)',
					_href: '#/nav/aria-current', // Please don't change this link. It's necessary to be the "current page" for the sample.
					_active: true,
				},
			]}
		/>
	</>
);
