import React from 'react';
import { KolNav } from '@public-ui/react';

import { FC } from 'react';

export const NavAriaCurrent: FC = () => (
	<KolNav
		_ariaLabel="Main navigation"
		_links={[
			{
				_label: 'Homepage',
				_href: '#/sample-page',
			},
			{
				_label: '2 Navigation point',
				_href: '#/sample-page',
				_active: true,
			},
		]}
		_ariaCurrentValue="page"
	/>
);
