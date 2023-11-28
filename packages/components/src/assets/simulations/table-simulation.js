const TABLE_HEADERS_H = {
	horizontal: [
		[
			{
				label: 'Werktage',
				colSpan: 5,
			},
			{
				label: 'Wochenende',
				colSpan: 2,
			},
		],
		[
			{
				key: 'montag',
				label: 'Montag',
				render: (el, data) => {
					const button = document.createElement('kol-button');
					button.setAttribute('_label', data.label);
					button.setAttribute('data-theme', 'default');
					button.setAttribute('style', 'font-size: 75%');
					button.setAttribute('exportparts', 'button,normal');
					button._on = { onClick: console.log };
					el.innerHTML = '';
					el.appendChild(button);
				},
				compareFn: (first, second) => {
					if (first.montag < second.montag) {
						return -1;
					}
					if (first.montag > second.montag) {
						return 1;
					}
					return 0;
				},
				sort: (data) => {
					return data.sort((first, second) => {
						if (first.montag < second.montag) {
							return -1;
						}
						if (first.montag > second.montag) {
							return 1;
						}
						return 0;
					});
				},
				sortDirection: 'ASC',
				textAlign: 'right',
			},
			{
				key: 'dienstag',
				label: 'Dienstag',
				render: (el, data) => (el.innerHTML = `<kol-badge _color="#060" _label="${data.label}"></kol-badge>`),
				compareFn: (first, second) => {
					if (first.dienstag < second.dienstag) {
						return -1;
					}
					if (first.dienstag > second.dienstag) {
						return 1;
					}
					return 0;
				},
				sortDirection: 'DESC',
			},
			{
				key: 'mittwoch',
				label: 'Mittwoch',
				compareFn: (first, second) => {
					if (first.mittwoch < second.mittwoch) {
						return -1;
					}
					if (first.mittwoch > second.mittwoch) {
						return 1;
					}
					return 0;
				},
				sortDirection: 'NOC',
				render: (el, data) => (el.innerHTML = `<kol-badge _color="#006" _label="${data.label}"></kol-badge>`),
			},
			{
				key: 'donnerstag',
				label: 'Donnerstag',
				render: (el, data) => (el.innerHTML = `<kol-badge _color="#600" _label="${data.label}"></kol-badge>`),
			},
			{
				key: 'freitag',
				label: 'Freitag',
				render: (el, data) => (el.innerHTML = `<kol-badge _color="#303" _label="${data.label}"></kol-badge>`),
			},
			{
				key: 'samstag',
				label: 'Samstag',
				render: (el, data) => (el.innerHTML = `<kol-badge _color="#330" _label="${data.label}"></kol-badge>`),
			},
			{
				key: 'sonntag',
				label: 'Sonntag',
				render: (el, data) => (el.innerHTML = `<kol-badge _color="#033" _label="${data.label}"></kol-badge>`),
			},
		],
	],
};
const TABLE_HEADERS_V = {
	vertical: [
		[
			{
				label: 'Früh',
			},
			{
				label: 'Mittag',
			},
			{
				label: 'Abend',
			},
			{
				label: 'Nacht',
			},
		],
	],
};
const TABLE_HEADERS_H_V = {
	horizontal: [
		[
			{
				label: '',
				rowSpan: 2,
				asTd: true,
			},
			...TABLE_HEADERS_H.horizontal[0],
		],
		[...TABLE_HEADERS_H.horizontal[1]],
	],
	...TABLE_HEADERS_V,
};
const TABLE_2_HEADERS = {
	horizontal: [
		[
			{
				asTd: true,
				colSpan: 2,
			},
		].concat(TABLE_HEADERS_V),
	],
	vertical: [
		[
			{
				...TABLE_HEADERS_H.horizontal[0][0],
				rowSpan: TABLE_HEADERS_H.horizontal[0][0].colSpan,
				colSpan: undefined,
			},
			{
				...TABLE_HEADERS_H.horizontal[0][1],
				rowSpan: TABLE_HEADERS_H.horizontal[0][1].colSpan,
				colSpan: undefined,
			},
		],
	].concat([TABLE_HEADERS_H.horizontal[1]]),
};
const TABLE_NVDA_HEADERS = {
	horizontal: [
		[
			{ label: 'Juni', key: 'juni', sort: (data) => data.sort((a, b) => sortTable(a, b, 'juni', 'number')) },
			{ label: 'April', key: 'april', sort: (data) => data.sort((a, b) => sortTable(a, b, 'april', 'number')) },
			{ label: 'Mai', key: 'mai', sort: (data) => data.sort((a, b) => sortTable(a, b, 'mai', 'number')) },
			{ label: 'Juli', key: 'juli', sort: (data) => data.sort((a, b) => sortTable(a, b, 'juli', 'number')) },
			{ label: 'August', key: 'august', sort: (data) => data.sort((a, b) => sortTable(a, b, 'august', 'number')) },
			{ label: 'September', key: 'september', sort: (data) => data.sort((a, b) => sortTable(a, b, 'september', 'number')) },
		],
	],
};

const TABLE_DATA = [
	{
		montag: 'Alex',
		dienstag: 'Hong',
		mittwoch: 'Kevin',
		donnerstag: 'Fabian',
		freitag: 'Alex',
		samstag: 'Kevin',
		sonntag: 'Hong',
	},
	{
		montag: 'Helena',
		dienstag: 'Fabian',
		mittwoch: 'Marie',
		donnerstag: 'Ben',
		freitag: 'Marcus',
		samstag: 'Alex',
		sonntag: 'Marcus',
	},
	{
		montag: 'Fabian',
		dienstag: 'Helena',
		mittwoch: 'Fabian',
		donnerstag: 'Maya',
		freitag: 'Ben',
		samstag: 'Alex',
		sonntag: 'Helena',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
];
const TABLE_DATA_SHORT = TABLE_DATA.slice(0, -1);
const TABLE_PAGED_DATA = [
	{
		montag: 'Alex',
		dienstag: 'Anna',
		mittwoch: 'Amalia',
		donnerstag: 'Arthur',
		freitag: 'Alex',
		samstag: 'Andrea',
		sonntag: 'Arnold',
	},
	{
		montag: 'Helena',
		dienstag: 'Fabian',
		mittwoch: 'Marie',
		donnerstag: 'Ben',
		freitag: 'Marcus',
		samstag: 'Alex',
		sonntag: 'Marcus',
	},
	{
		montag: 'Fabian',
		dienstag: 'Helena',
		mittwoch: 'Fabian',
		donnerstag: 'Maya',
		freitag: 'Ben',
		samstag: 'Alex',
		sonntag: 'Helena',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Samuel',
		dienstag: 'Selena',
		mittwoch: 'Sandra',
		donnerstag: 'Salim',
		freitag: 'Robert',
		samstag: 'Richard',
		sonntag: 'Pamela',
	},
	{
		montag: 'Samuel',
		dienstag: 'Selena',
		mittwoch: 'Sandra',
		donnerstag: 'Salim',
		freitag: 'Robert',
		samstag: 'Richard',
		sonntag: 'Pamela',
	},
	{
		montag: 'Finn',
		dienstag: 'Roger',
		mittwoch: 'Christian',
		donnerstag: 'Caspar',
		freitag: 'David',
		samstag: 'Bernard',
		sonntag: 'Anna',
	},
	{
		montag: 'Alex',
		dienstag: 'Anna',
		mittwoch: 'Amalia',
		donnerstag: 'Arthur',
		freitag: 'Alex',
		samstag: 'Andrea',
		sonntag: 'Arnold',
	},
	{
		montag: 'Helena',
		dienstag: 'Fabian',
		mittwoch: 'Marie',
		donnerstag: 'Ben',
		freitag: 'Marcus',
		samstag: 'Alex',
		sonntag: 'Marcus',
	},
	{
		montag: 'Fabian',
		dienstag: 'Helena',
		mittwoch: 'Fabian',
		donnerstag: 'Maya',
		freitag: 'Ben',
		samstag: 'Alex',
		sonntag: 'Helena',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Samuel',
		dienstag: 'Selena',
		mittwoch: 'Sandra',
		donnerstag: 'Salim',
		freitag: 'Robert',
		samstag: 'Richard',
		sonntag: 'Pamela',
	},
	{
		montag: 'Samuel',
		dienstag: 'Selena',
		mittwoch: 'Sandra',
		donnerstag: 'Salim',
		freitag: 'Robert',
		samstag: 'Richard',
		sonntag: 'Pamela',
	},
	{
		montag: 'Finn',
		dienstag: 'Roger',
		mittwoch: 'Christian',
		donnerstag: 'Caspar',
		freitag: 'David',
		samstag: 'Bernard',
		sonntag: 'Anna',
	},
	{
		montag: 'Alex',
		dienstag: 'Anna',
		mittwoch: 'Amalia',
		donnerstag: 'Arthur',
		freitag: 'Alex',
		samstag: 'Andrea',
		sonntag: 'Arnold',
	},
	{
		montag: 'Helena',
		dienstag: 'Fabian',
		mittwoch: 'Marie',
		donnerstag: 'Ben',
		freitag: 'Marcus',
		samstag: 'Alex',
		sonntag: 'Marcus',
	},
	{
		montag: 'Fabian',
		dienstag: 'Helena',
		mittwoch: 'Fabian',
		donnerstag: 'Maya',
		freitag: 'Ben',
		samstag: 'Alex',
		sonntag: 'Helena',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Samuel',
		dienstag: 'Selena',
		mittwoch: 'Sandra',
		donnerstag: 'Salim',
		freitag: 'Robert',
		samstag: 'Richard',
		sonntag: 'Pamela',
	},
	{
		montag: 'Samuel',
		dienstag: 'Selena',
		mittwoch: 'Sandra',
		donnerstag: 'Salim',
		freitag: 'Robert',
		samstag: 'Richard',
		sonntag: 'Pamela',
	},
	{
		montag: 'Finn',
		dienstag: 'Roger',
		mittwoch: 'Christian',
		donnerstag: 'Caspar',
		freitag: 'David',
		samstag: 'Bernard',
		sonntag: 'Anna',
	},
	{
		montag: 'Alex',
		dienstag: 'Anna',
		mittwoch: 'Amalia',
		donnerstag: 'Arthur',
		freitag: 'Alex',
		samstag: 'Andrea',
		sonntag: 'Arnold',
	},
	{
		montag: 'Helena',
		dienstag: 'Fabian',
		mittwoch: 'Marie',
		donnerstag: 'Ben',
		freitag: 'Marcus',
		samstag: 'Alex',
		sonntag: 'Marcus',
	},
	{
		montag: 'Fabian',
		dienstag: 'Helena',
		mittwoch: 'Fabian',
		donnerstag: 'Maya',
		freitag: 'Ben',
		samstag: 'Alex',
		sonntag: 'Helena',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Samuel',
		dienstag: 'Selena',
		mittwoch: 'Sandra',
		donnerstag: 'Salim',
		freitag: 'Robert',
		samstag: 'Richard',
		sonntag: 'Pamela',
	},
	{
		montag: 'Samuel',
		dienstag: 'Selena',
		mittwoch: 'Sandra',
		donnerstag: 'Salim',
		freitag: 'Robert',
		samstag: 'Richard',
		sonntag: 'Pamela',
	},
	{
		montag: 'Finn',
		dienstag: 'Roger',
		mittwoch: 'Christian',
		donnerstag: 'Caspar',
		freitag: 'David',
		samstag: 'Bernard',
		sonntag: 'Anna',
	},
	{
		montag: 'Alex',
		dienstag: 'Anna',
		mittwoch: 'Amalia',
		donnerstag: 'Arthur',
		freitag: 'Alex',
		samstag: 'Andrea',
		sonntag: 'Arnold',
	},
	{
		montag: 'Helena',
		dienstag: 'Fabian',
		mittwoch: 'Marie',
		donnerstag: 'Ben',
		freitag: 'Marcus',
		samstag: 'Alex',
		sonntag: 'Marcus',
	},
	{
		montag: 'Fabian',
		dienstag: 'Helena',
		mittwoch: 'Fabian',
		donnerstag: 'Maya',
		freitag: 'Ben',
		samstag: 'Alex',
		sonntag: 'Helena',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Hong',
		dienstag: 'Alex',
		mittwoch: 'Kevin',
		donnerstag: 'Maya',
		freitag: 'Fabian',
		samstag: 'Helena',
		sonntag: 'Alex',
	},
	{
		montag: 'Samuel',
		dienstag: 'Selena',
		mittwoch: 'Sandra',
		donnerstag: 'Salim',
		freitag: 'Robert',
		samstag: 'Richard',
		sonntag: 'Pamela',
	},
	{
		montag: 'Samuel',
		dienstag: 'Selena',
		mittwoch: 'Sandra',
		donnerstag: 'Salim',
		freitag: 'Robert',
		samstag: 'Richard',
		sonntag: 'Pamela',
	},
	{
		montag: 'Finn',
		dienstag: 'Roger',
		mittwoch: 'Christian',
		donnerstag: 'Caspar',
		freitag: 'David',
		samstag: 'Bernard',
		sonntag: 'Anna',
	},
];
const TABLE_2_DATA = [
	{ montag: 'Alex', dienstag: 'Marie', mittwoch: 'Kevin', donnerstag: 'Maya', freitag: 'Ben' },
	{ montag: 'Helena', dienstag: 'Marie', mittwoch: 'Kevin', donnerstag: 'Maya', freitag: 'Marcus' },
	{ montag: 'Fabian', dienstag: 'Marie', mittwoch: 'Kevin', donnerstag: 'Maya', freitag: 'Ben' },
	{ montag: 'Hong', dienstag: 'Marie', mittwoch: 'Kevin', donnerstag: 'Maya', freitag: 'Ben' },
];
const TABLE_NVDA_DATA = [
	{ april: '97', mai: '99', juni: '100', juli: '101', august: '102', september: '105' },
	{ april: '11', mai: '13', juni: '13', juli: '13', august: '12', september: '12' },
	{ april: '86', mai: '85', juni: '87', juli: '88', august: '87', september: '90' },
	{ april: '11', mai: '12', juni: '12', juli: '11', august: '12', september: '12' },
	{ april: '42', mai: '41', juni: '42', juli: '43', august: '39', september: '42' },
	{ april: '100', mai: '99', juni: '98', juli: '99', august: '102', september: '109' },
];

const TABLE_FOOT_DATA = [
	{
		montag: '1',
		dienstag: '2',
		mittwoch: '3',
		donnerstag: '4',
		freitag: '5',
		samstag: '6',
		sonntag: '7',
	},
];

const PAGINATION_1 = {
	_boundaryCount: 0,
	_page: 3,
	_pageSize: 20,
	_pageSizeOptions: [5, 10, 20, 50, 100],
	_on: {
		onClick: console.log,
		onChangePage: console.log,
		onChangePageSize: console.log,
	},
};
const PAGINATION_2 = {
	_boundaryCount: 0,
	_page: 3,
	_pageSize: 10,
	_pageSizeOptions: [5, 10, 20, 50, 100],
	_on: {
		onClick: console.log,
		onChangePage: console.log,
		onChangePageSize: console.log,
	},
};

function setTableData(tableID, caption, data, header, footer) {
	setTimeout(() => {
		const table = document.querySelector(tableID);
		if (table) {
			table._label = caption;
			table._data = data;
			if (header) table._headers = header;
			if (footer) table._dataFoot = footer;
		}
	}, 500);
}
function setMultipleTableData(tableClass, caption, data, header, footer) {
	setTimeout(() => {
		const tables = document.querySelectorAll(tableClass);
		tables.forEach((table) => {
			table._label = caption;
			table._data = data;
			if (header) table._headers = header;
			if (footer) table._dataFoot = footer;
		});
	}, 500);
}

function sortTable(a, b, key, type) {
	if (!type) type = 'string';
	switch (type) {
		case 'number':
			return parseFloat(a[key]) - parseFloat(b[key]);
		case 'string':
			return a[key].localeCompare(b[key]);
	}
}

setTableData('#table-1a', 'header: h/v, data: short, foot', TABLE_DATA_SHORT, TABLE_HEADERS_H_V, TABLE_FOOT_DATA);
setTableData('#table-1b', 'header: h, data: short, foot', TABLE_DATA_SHORT, TABLE_HEADERS_H, TABLE_FOOT_DATA);
setTableData('#table-1c', 'header: h, data: short', TABLE_DATA_SHORT, TABLE_HEADERS_H);
setTableData('#table-1d', 'header: h/v, data: default', TABLE_DATA, TABLE_HEADERS_H_V);

setTableData('#table-2', '2 Header, Daten Vertikal, Sort and Render', TABLE_2_DATA, TABLE_2_HEADERS);

setTableData('#table-3a', 'header: h, data: paged', TABLE_PAGED_DATA, TABLE_HEADERS_H);
setTableData('#table-3b', 'header: h, data: paged, pagination-1', TABLE_PAGED_DATA, TABLE_HEADERS_H, undefined, PAGINATION_1);

setTableData('#table-4', 'header: h, data: paged, pagination-2', TABLE_PAGED_DATA, TABLE_HEADERS_H, undefined, PAGINATION_2);

setTableData('#nvda', 'Sortiertest NVDA', TABLE_NVDA_DATA, TABLE_NVDA_HEADERS);

const dayTableHeaders = {
	horizontal: [
		[
			{ label: '', colSpan: 1, rowSpan: 1, asTd: true },
			{ label: 'Tag', key: 'day' },
			{ label: 'Info', key: 'info' },
		],
	],
	vertical: [
		[
			{ label: '1', key: '1' },
			{ label: '2', key: '2' },
			{ label: '3', key: '3' },
			{ label: '4', key: '4' },
			{ label: '5', key: '5' },
		],
	],
};
const dayTableData = [
	{ day: 'Montag', info: 'Herr Mohn' },
	{ day: 'Dienstag', info: 'Dienst' },
	{ day: 'Mittwoch', info: 'Mitte der Woche' },
	{ day: 'Donnerstag', info: 'Donner' },
	{ day: 'Freitag', info: 'frei' },
];
setTableData('day_table', 'DayTable', dayTableData, dayTableHeaders);
