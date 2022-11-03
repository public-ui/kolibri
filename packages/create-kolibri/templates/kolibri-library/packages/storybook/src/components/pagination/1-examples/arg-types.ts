export const argTypes = {
	_boundaryCount: {
		name: 'Anzahl Elemente gruppieren',
		control: {
			type: 'number',
		},
		type: {
			required: true,
		},
		defaultValue: 0,
	},
	_count: {
		name: 'Anzahl Elemente',
		control: {
			type: 'number',
		},
		type: {
			required: true,
		},
		defaultValue: 10,
	},
	_page: {
		name: 'Aktive Seite',
		control: {
			type: 'number',
		},
		type: {
			required: true,
		},
		defaultValue: 6,
	},
	_siblingCount: {
		name: 'Sibling',
		control: {
			type: 'number',
		},
		type: {
			required: true,
		},
		defaultValue: 2,
	},
};
