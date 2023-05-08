/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-undef */
const navTest = document.querySelector('#nav-test');
if (navTest) {
	navTest._links = [
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
}

const clickNav = document.querySelector('#click-nav');
if (clickNav) {
	clickNav._links = [
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
}

setTimeout(() => {
	const mainNav = document.querySelector('#main-nav');
	const mainNavElements = document.querySelectorAll('main > kol-accordion');
	const numberOfChildren = 6;
	if (mainNav) populateNavFromElements(mainNav, mainNavElements, numberOfChildren);
}, 1000);

function createEntry(c) {
	return {
		_label: c.getAttribute('_heading'),
		_href: `#${c.id}`,
		_icon: 'codicon codicon-flame',
	};
}

function populateNavFromElements(nav, elements, numberOfChildren) {
	const result = [];
	let counter = 0;
	let parentCount = 0;
	let currentParent = null;
	elements.forEach((c) => {
		if (counter >= numberOfChildren) counter = 0;
		if (counter === 0) {
			const n = parentCount * numberOfChildren;
			currentParent = { _label: `Komponente ${n + 1} bis ${n + numberOfChildren}`, _icon: 'codicon codicon-flame', _children: [] };
			result.push(currentParent);
			parentCount++;
		}
		currentParent._children.push(createEntry(c));
		counter++;
	});
	nav._links = result;
}
