export const argTypes = {
	_level: {
		name: 'Überschrift (h1 bis h6)',
		control: {
			type: 'select',
		},
		options: [1, 2, 3, 4, 5, 6],
		type: {
			required: true,
		},
		defaultValue: 1,
	},
	content: {
		name: 'Titel',
		control: {
			type: 'text',
		},
		defaultValue: 'Beliebiger Titel.',
	},
};
