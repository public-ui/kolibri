export const argTypes = {
	_accessKey: {
		name: 'Tastenkombination Input',
		control: {
			type: 'text',
		},
		type: {
			required: false,
		},
		defaultValue: '',
	},
	_autoComplete: {
		name: 'Autocomplete',
		control: {
			type: 'select',
		},
		options: ['off', 'on'],
		type: {
			required: false,
		},
		defaultValue: 'off',
	},
	_autoFocus: {
		name: 'Input fokussierbar?',
		control: {
			type: 'boolean',
		},
		type: {
			required: false,
		},
		defaultValue: 0,
	},
	_disabled: {
		name: 'Deaktiviert',
		control: {
			type: 'boolean',
		},
		type: {
			required: false,
		},
		defaultValue: 0,
	},
	_error: {
		name: 'Fehlermeldung',
		control: {
			type: 'text',
		},
		type: {
			required: false,
		},
		defaultValue: '',
	},
	_id: {
		name: 'ID',
		control: {
			type: 'text',
		},
		type: {
			required: true,
		},
		defaultValue: '',
	},
	_list: {
		name: 'Vorschlagsliste',
		control: {
			type: 'text',
		},
		type: {
			required: false,
		},
		defaultValue: "['alpha@email.de','beta@email.de',gamma@email.de']",
	},
	_maxLength: {
		name: 'Max. Eingabelänge',
		control: {
			type: 'number',
		},
		type: {
			required: false,
		},
		defaultValue: 20,
	},
	_multiple: {
		name: 'Multiple',
		control: {
			type: 'boolean',
		},
		type: {
			required: false,
		},
		defaultValue: 0,
	},
	_name: {
		name: 'Name (technisch)',
		control: {
			type: 'text',
		},
		type: {
			required: true,
		},
		defaultValue: '',
	},
	_tabIndex: {
		name: 'Tab-Index',
		control: {
			type: 'text',
		},
		type: {
			required: false,
		},
		defaultValue: 0,
	},
	_touched: {
		name: 'Besucht',
		control: {
			type: 'boolean',
		},
		type: {
			required: false,
		},
		defaultValue: 0,
	},
	_value: {
		name: 'Wert',
		control: {
			type: 'text',
		},
		type: {
			required: false,
		},
		defaultValue: 'info@email.de',
	},
};
