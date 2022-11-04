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
	_label: {
		name: 'Label',
		control: {
			type: 'text',
		},
		type: {
			required: false,
		},
		defaultValue: '',
	},
	_list: {
		name: 'Vorschlagsliste',
		control: {
			type: 'date',
		},
		type: {
			required: false,
		},
		defaultValue: "['alpha@email.de','beta@email.de',gamma@email.de']",
	},
	_max: {
		name: 'Max. Eingabewert',
		control: {
			type: 'date',
		},
		type: {
			required: false,
		},
	},
	_min: {
		name: 'Min. Eingabewert',
		control: {
			type: 'date',
		},
		type: {
			required: false,
		},
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
	_step: {
		name: 'Schrittweite Eingabewert',
		control: {
			type: 'number',
		},
		type: {
			required: false,
		},
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
	_type: {
		name: 'Typ',
		control: {
			type: 'select',
		},
		options: ['date', 'datetime-local', 'month', 'time', 'week'],
		type: {
			required: true,
		},
		defaultValue: 'date',
	},
	_value: {
		name: 'Wert',
		control: {
			type: 'date',
		},
		type: {
			required: false,
		},
		defaultValue: 0,
	},
};
