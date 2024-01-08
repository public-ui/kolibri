import { ButtonOrLinkOrTextWithChildrenProps } from '@public-ui/components';

export const LINKS: ButtonOrLinkOrTextWithChildrenProps[] = [
	{
		_label: 'Homepage',
		_icons: 'codicon codicon-home',
		_href: '#/',
	},
	{
		_label: '2 Navigation point',
		_href: '#/untermenu',
	},
	{
		_label: '3 Navigation point',
		_href: '#abc',
		_icons: 'codicon codicon-home',
		_children: [
			{
				_label: '3.1 Navigation point',
				_icons: 'codicon codicon-home',
				_href: '#/',
			},
			{
				_label: '3.2 Navigation point',
				_href: '#abc',
				_target: 'asdasd',
			},
			{
				_label: '3.3 Navigation point',
				_href: '#abc',
				_children: [
					{
						_label: '3.3.1 Navigation point',
						_href: '#abc',
					},
					{ _label: '3.3.2 Navigation point', _href: '#abc' },
				],
			},
			{
				_label: '3.4 Navigation point',
				_href: '#abc',
				_children: [
					{
						_label: '3.4.1 Navigation point',
						_href: '#abc',
						_children: [
							{ _label: '3.4.1.1 Navigation point', _href: '#abc' },
							{ _label: '3.4.1.2 Navigation point (active)', _href: '#abc' },
						],
					},
					{ _label: '3.4.2 Navigation point', _href: '#abc' },
				],
			},
			{ _label: '3.5 Navigation point', _href: '#abc' },
		],
	},
	{ _label: '4 Navigation point', _href: '#abc' },
	{
		_label: '5 Keine eigene Seite, nur Kategorie',
		_active: true,
		_children: [
			{
				_label: '5.1 Verschachtelter Link',
				_href: '#abc',
			},
		],
	},
	{
		_label: '6 Keine eigene Seite, mit Icon',
		_icons: 'codicon codicon-squirrel',
		_children: [
			{
				_label: '6.1 Verschachtelter Link',
				_href: '#abc',
			},
		],
	},
];
