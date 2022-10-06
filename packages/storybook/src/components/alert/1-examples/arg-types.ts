export const argTypes = {
	_alert: {
		name: 'Mit Screenreader vorlesen',
		control: {
			type: 'boolean',
		},
	},
	content: {
		name: 'Text',
		control: {
			type: 'text',
		},
	},
	_heading: {
		name: 'Überschrift',
		control: {
			type: 'text',
			required: true,
		},
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
	},
	_type: {
		name: 'Typ',
		control: {
			type: 'select',
		},
		options: ['success', 'error', 'info', 'warning'],
		type: {
			required: true,
		},
	},
	_variant: {
		name: 'Variante',
		control: {
			type: 'select',
		},
		options: ['card', 'card-icon', 'msg', 'msg-icon'],
		type: {
			required: true,
		},
	},
};
