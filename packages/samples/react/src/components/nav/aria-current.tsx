import React from 'react';
import { KolNav } from '@public-ui/react';

import { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const NavAriaCurrent: FC = () => (
	<>
		<SampleDescription>
			<p>
				This sample shows KolNav with a link to the current page. This makes the component automatically assign <code>aria-current=&quot;page&quot;</code>
				to it.
			</p>
		</SampleDescription>
		<KolNav
			_ariaLabel="Main navigation"
			_links={[
				{
					_label: 'Homepage',
					_href: '#/back-page',
				},
				{
					_label: '2 Navigation point',
					_href: '#/back-page',
					_active: true,
				},
			]}
			_ariaCurrentValue="page"
		/>
	</>
);
