export const argTypes = {
	_open: {
		control: {
			type: 'boolean',
		},
		defaultValue: false,
	},
	_summary: {
		name: 'Überschrift',
		control: {
			type: 'text',
		},
		type: {
			required: true,
		},
		defaultValue: 'Beispieltext',
	},
	content: {
		name: 'Body-Inhalt',
		control: {
			type: 'text',
		},
		defaultValue: 'Beliebiger Inhalt eines Details.',
	},
};
