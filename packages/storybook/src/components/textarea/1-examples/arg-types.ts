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
	_maxLength: {
		name: 'Länge Inhalt',
		control: {
			type: 'number',
		},
		type: {
			required: false,
		},
		defaultValue: 255,
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
		name: 'Platzhaltertext',
		control: {
			type: 'text',
		},
		type: {
			required: false,
		},
		defaultValue: '',
	},
	_readOnly: {
		name: 'Nur lesen',
		control: {
			type: 'boolean',
		},
		type: {
			required: false,
		},
		defaultValue: false,
	},
	_resize: {
		name: 'Größenänderung',
		control: {
			type: 'select',
		},
		options: ['none', 'horizontal', 'vertical', 'both'],
		type: {
			required: false,
		},
		defaultValue: 'none',
	},
	_rows: {
		name: 'Höhe (Rows)',
		control: {
			type: 'number',
		},
		type: {
			required: false,
		},
		defaultValue: 1,
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
		defaultValue: '',
	},
};
