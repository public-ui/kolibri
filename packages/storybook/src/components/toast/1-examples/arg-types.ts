export const argTypes = {
	_type: {
		name: 'Typ',
		control: {
			type: 'select',
		},
		options: ['success', 'error', 'info', 'warning'],
		type: {
			required: true,
		},
		defaultValue: 'success',
	},
	_level: {
		name: 'Level',
		control: {
			type: 'select',
		},
		options: [1, 2, 3, 4, 5, 6],
		type: {
			required: true,
		},
		defaultValue: 1,
	},
	_heading: {
		name: 'Überschrift',
		control: {
			type: 'text',
			required: true,
		},
		defaultValue: 'Überschrift',
	},
	_showDuration: {
		name: 'Anzeigedauer',
		control: {
			type: 'text',
			required: true,
		},
		defaultValue: '5000',
	},
	content: {
		name: 'Text',
		control: {
			type: 'text',
		},
		defaultValue: 'Hier kann man einen beliebigen HTML-Inhalt einfügen.',
	},
};
