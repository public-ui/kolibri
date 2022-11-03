export const argTypes = {
	_ariaLabel: {
		name: 'Modal-Beschriftung',
		control: {
			type: 'text',
		},
		type: {
			required: true,
		},
		defaultValue: 'Ich bin ein Modal.',
	},
	_width: {
		name: 'Modal-Breite',
		control: {
			type: 'select',
		},
		options: ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
		type: {
			required: true,
		},
		defaultValue: '80%',
	},
};
