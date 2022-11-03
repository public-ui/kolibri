export const argTypes = {
	_type: {
		name: 'Typ',
		control: {
			type: 'select',
		},
		options: ['bar', 'cycle'],
		type: {
			required: true,
		},
		defaultValue: 'bar',
	},
	_max: {
		name: 'Maximalwert',
		control: {
			type: 'text',
		},
		type: {
			required: true,
		},
		defaultValue: '100',
	},
	_value: {
		name: 'Aktueller Wert',
		control: {
			type: 'text',
		},
		type: {
			required: true,
		},
		defaultValue: '10',
	},
};
