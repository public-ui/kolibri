import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getNavHtml } from './html.mock';

import type { SpecPage } from '@stencil/core/testing';
import type { NavProps } from '@public-ui/schema';
import { KolNav } from '../component';

executeTests<NavProps>(
	'Nav',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolNav],
			template: () => <kol-nav {...props} />,
		});
		return page;
	},
	{
		_hasIconsWhenExpanded: [true, false],
		_hasCompactButton: [true, false],
		_hideLabel: [true, false],
		_label: ['Nav Label', ''],
		_links: [
			[
				{
					_label: 'Homepage',
					_href: '#',
				},
				{
					_label: 'Nav - aria-current',
					_href: '#',
					_active: true,
				},
				{
					_label: '3 Navigation point',
					_href: '#',
					_icons: 'codicon codicon-home',

					_children: [
						{
							_label: '3.1 Navigation point',
							_icons: 'codicon codicon-home',
							_href: '#',
						},
					],
				},

				{
					_label: '6 Keine eigene Seite, mit Icon',
					_icons: 'codicon codicon-squirrel',
				},
			],
		],
	},
	getNavHtml,
	{ execMode: 'default' },
);
