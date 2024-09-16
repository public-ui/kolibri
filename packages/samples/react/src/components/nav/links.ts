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
		_label: '5 No own page, only category',
		_active: true,
		_children: [
			{
				_label: '5.1 Nested link',
				_href: '#/back-page',
			},
		],
	},
	{
		_label: '6 No own page, with icon',
		_icons: 'codicon codicon-squirrel',
		_children: [
			{
				_label: '6.1 Nested link',
				_href: '#/back-page',
			},
		],
	},
];

export const LINKS_WITHOUT_SUBMENU: ButtonOrLinkOrTextWithChildrenProps[] = [
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
	},
	{
		_label: '4 Navigation point with children and onClick',
		_on: {
			onClick: () => console.log('4.1 Nested link clicked'),
		},
	},
	{
		_label: '5 No own page, only category',
		_active: true,
	},
	{
		_label: '6 No own page, with icon',
		_icons: 'codicon codicon-squirrel',
	},
];
