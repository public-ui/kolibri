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
	_hideLabel: {
		name: 'Label anzeigen',
		control: {
			type: 'boolean',
		},
		type: {
			required: false,
		},
		defaultValue: true,
	},
	_icon: {
		name: 'Icon',
		control: {
			type: 'text',
		},
		defaultValue: "{'top': {'icon':'icofont-arrow-up'}}",
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
	_maxLength: {
		name: 'Max. Eingabelänge',
		control: {
			type: 'number',
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
	_placeholder: {
		name: 'Platzhalter',
		control: {
			type: 'text',
		},
		type: {
			required: false,
		},
		defaultValue: 'Platzhaltertext',
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
		options: ['text', 'search', 'url', 'tel'],
		type: {
			required: true,
		},
		defaultValue: 'text',
	},
	_value: {
		name: 'Wert',
		control: {
			type: 'text',
		},
		type: {
			required: false,
		},
		defaultValue: '',
	},
	label: {
		name: 'Label',
		control: {
			type: 'text',
		},
		type: {
			required: false,
		},
		defaultValue: 'Label',
	},
};
