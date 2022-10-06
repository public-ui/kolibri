export const argTypes = {
	_heading: {
		name: 'Überschrift',
		control: {
			type: 'text',
		},
		type: {
			required: true,
		},
	},
	_level: {
		name: 'Überschrift (h1 bis h6)',
		control: {
			type: 'select',
		},
		options: [1, 2, 3, 4, 5, 6],
		type: {
			required: true,
		},
	},
	_open: {
		name: 'Aufgeklappt',
		control: {
			type: 'boolean',
		},
	},
	header: {
		name: 'Head-Inhalt',
		control: {
			type: 'text',
		},
	},
	content: {
		name: 'Body-Inhalt',
		control: {
			type: 'text',
		},
	},
};
