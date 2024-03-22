import { ButtonOrLinkOrTextWithChildrenProps } from '@public-ui/components';

export const LINKS: ButtonOrLinkOrTextWithChildrenProps[] = [
	{
		_label: 'Homepage',
		_icons: 'codicon codicon-home',
		_on: {
			onClick: () => console.log('Homepage clicked'),
		},
	},
	{
		_label: '2 Navigation point',
		_href: '#/back-page',
		_on: {
			onClick: () => console.log('Link clicked'),
		},
	},
	{
		_label: '3 Navigation point',
		_href: '#/back-page',
		_icons: 'codicon codicon-home',
		_children: [
			{
				_label: '3.1 Navigation point',
				_icons: 'codicon codicon-home',
				_href: '#/back-page',
			},
			{
				_label: '3.2 Navigation point',
				_href: '#/back-page',
				_target: 'asdasd',
			},
			{
				_label: '3.3 Navigation point',
				_href: '#/back-page',
				_children: [
					{
						_label: '3.3.1 Navigation point',
						_href: '#/back-page',
					},
					{ _label: '3.3.2 Navigation point', _href: '#/back-page' },
				],
			},
			{
				_label: '3.4 Navigation point',
				_href: '#/back-page',
				_children: [
					{
						_label: '3.4.1 Navigation point',
						_href: '#/back-page',
						_children: [
							{ _label: '3.4.1.1 Navigation point', _href: '#/back-page' },
							{ _label: '3.4.1.2 Navigation point (active)', _href: '#/back-page' },
						],
					},
					{ _label: '3.4.2 Navigation point', _href: '#/back-page' },
				],
			},
			{ _label: '3.5 Navigation point', _href: '#/back-page' },
		],
	},
	{
		_label: '4 Navigation point with children and onClick',
		_children: [
			{
				_label: '4.1 Nested link',
				_href: '#/back-page',
			},
		],
		_on: {
			onClick: () => console.log('4.1 Nested link clicked'),
		},
	},
	{
		_label: '5 Keine eigene Seite, nur Kategorie',
		_active: true,
		_children: [
			{
				_label: '5.1 Verschachtelter Link',
				_href: '#/back-page',
			},
		],
	},
	{
		_label: '6 Keine eigene Seite, mit Icon',
		_icons: 'codicon codicon-squirrel',
		_children: [
			{
				_label: '6.1 Verschachtelter Link',
				_href: '#/back-page',
			},
		],
	},
];
