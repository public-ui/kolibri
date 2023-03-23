/* eslint-disable no-undef */
document.querySelector('#nav-test')._links = [
	{
		_label: '1 Navigationspunkt mit sehr langem Link-Test',
		_href: '#asdf',
		_icon: 'codicon codicon-flame',
	},
	{
		_label: '2 Navigationspunkt und ich_bin_ein_echt_langes_zusammengesetztes_Worte_und_versuche_das_Layout_zu_brechen',
		_on: {
			onClick: () => {
				alert('hallo');
			},
		},
		_icon: 'codicon codicon-flame',
	},
	{
		_label: '3 Navigationspunkt mit viel Text zu was testen',
		_href: '#abc',
		_icon: 'codicon codicon-flame',
		_children: [
			{ _label: '3.1 Navigationspunkt', _href: '#abc', _icon: 'codicon codicon-flame' },
			{ _label: '3.2 Navigationspunkt', _href: '#abc', _icon: 'codicon codicon-flame', _target: 'asdasd' },
			{
				_icon: 'codicon codicon-flame',
				_label: '3.3 Navigationspunkt',
				_href: '#abc3.3',
				_children: [
					{ _icon: 'codicon codicon-flame', _label: '3.3.1 Navigationspunkt', _href: '#abc' },
					{ _icon: 'codicon codicon-flame', _label: '3.3.2 Navigationspunkt', _href: '#abc' },
				],
			},
			{
				_icon: 'codicon codicon-flame',
				_label: '3.4 Navigationspunkt',
				_href: '#abc3.4',
				_children: [
					{ _icon: 'codicon codicon-flame', _label: '3.4.1 Navigationspunkt', _href: '#abc' },
					{ _icon: 'codicon codicon-flame', _label: '3.4.2 Navigationspunkt', _href: '#abc' },
				],
			},
			{ _icon: 'codicon codicon-flame', _label: '3.5 Navigationspunkt', _href: '#abc' },
		],
	},
	{
		_label: '4 Navigationspunkt mit viel Text zu was testen',
		_icon: 'codicon codicon-flame',
		_children: [
			{ _label: '4.1 Navigationspunkt', _href: '#abc', _icon: 'codicon codicon-flame' },
			{ _label: '4.2 Navigationspunkt', _href: '#abc', _icon: 'codicon codicon-flame', _target: 'asdasd' },
			{
				_icon: 'codicon codicon-flame',
				_label: '4.3 Navigationspunkt',
				_href: '#abc',
				_children: [
					{ _icon: 'codicon codicon-flame', _label: '4.3.1 Navigationspunkt', _href: '#abc' },
					{ _icon: 'codicon codicon-flame', _label: '4.3.2 Navigationspunkt', _href: '#abc' },
				],
			},
			{
				_icon: 'codicon codicon-flame',
				_label: '4.4 Navigationspunkt',
				_href: '#abc',
				_children: [
					{ _icon: 'codicon codicon-flame', _label: '4.4.1 Navigationspunkt', _href: '#abc' },
					{ _icon: 'codicon codicon-flame', _label: '4.4.2 Navigationspunkt', _href: '#abc' },
				],
			},
			{ _icon: 'codicon codicon-flame', _label: '4.5 Navigationspunkt', _href: '#abc' },
		],
	},
];

document.querySelector('#click-nav')._links = [
	{
		_label: '1 Navigationspunkt mit sehr langem Link-Test',
		_on: {
			onClick: () => {
				alert('hallo');
			},
		},
		_icon: 'icofont-woodpecker',
	},
	{
		_label: '2 Navigationspunkt und ich_bin_ein_echt_langes_zusammengesetztes_Worte_und_versuche_das_Layout_zu_brechen',
		_on: {
			onClick: () => {
				alert('hallo');
			},
		},
		_icon: 'icofont-woodpecker',
	},
	{
		_active: true,
		_label: '3 Navigationspunkt',
		_href: '#abc',
		_icon: 'icofont-woodpecker',
		_children: [
			{ _label: '3.1 Navigationspunkt', _href: '#abc', _icon: 'icofont-woodpecker' },
			{ _label: '3.2 Navigationspunkt', _href: '#abc', _icon: 'icofont-woodpecker', _target: 'asdasd' },
			{
				_active: true,
				_label: '3.3 Navigationspunkt',
				_href: '#abc',
				_children: [
					{ _active: true, _label: '3.3.1 Navigationspunkt (aktiv)', _href: '#abc' },
					{ _label: '3.3.2 Navigationspunkt', _href: '#abc' },
				],
			},
			{
				_label: '3.4 Navigationspunkt',
				_href: '#abc',
				_children: [
					{ _label: '3.4.1 Navigationspunkt', _href: '#abc' },
					{ _label: '3.4.2 Navigationspunkt', _href: '#abc' },
				],
			},
			{ _label: '3.5 Navigationspunkt', _href: '#abc' },
		],
	},
	{ _label: '4 Navigationspunkt', _href: '#abc' },
];
