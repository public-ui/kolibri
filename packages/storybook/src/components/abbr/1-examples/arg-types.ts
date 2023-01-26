export const argTypes = {
	content: {
		name: 'Text',
		control: {
			type: 'text',
		},
		type: {
			required: true,
		},
		defaultValue: 'z.B.',
	},
	_title: {
		name: 'Title',
		control: {
			type: 'text',
		},
		type: {
			required: true,
		},
		defaultValue: 'zum Beispiel',
	},
	_tooltipAlign: {
		name: 'Ausrichtung',
		control: {
			type: 'select',
		},
		options: ['top', 'bottom', 'left', 'right'],
		defaultValue: 'top',
	},
};
