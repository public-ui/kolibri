import React from 'react';
import { KolNav } from '@public-ui/react';

import { FC } from 'react';

export const NavHorizontal: FC = () => (
	<KolNav
		_ariaLabel="Main navigation"
		_links={[
			{
				_label: 'Homepage',
				_href: '#/nav/horizontal',
			},
			{
				_label: '2 Navigation point',
				_href: '#/nav/horizontal',
			},
			{
				_active: true,
				_label: '3 Navigation point',
				_href: '#/nav/horizontal',
				_children: [
					{
						_label: '3.1 Navigation point',
					},
					{
						_label: '3.2 Navigation point',
						_href: '#/nav/horizontal',
						_target: 'asdasd',
					},
					{
						_active: true,
						_label: '3.3 Navigation point',
						_href: '#/nav/horizontal',
						_children: [
							{
								_active: true,
								_label: '3.3.1 Navigation point (active)',
								_href: '#abc',
							},
							{ _label: '3.3.2 Navigation point', _href: '#abc' },
						],
					},
					{
						_label: '3.4 Navigation point',
						_href: '#/nav/horizontal',
						_children: [
							{ _label: '3.4.1 Navigation point', _href: '#abc' },
							{ _label: '3.4.2 Navigation point', _href: '#abc' },
						],
					},
					{ _label: '3.5 Navigation point', _href: '#abc' },
				],
			},
			{ _label: '4 Navigation point', _href: '#abc' },
		]}
		_orientation="horizontal"
	/>
);
