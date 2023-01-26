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
	_list: {
		name: 'Liste',
		control: {
			type: 'text',
		},
		type: {
			required: true,
		},
		defaultValue: "[{'label':'Herr','value':'Herr'},{'label':'Frau','value':'Frau'},{'label':'Firma','value':'Firma'}]",
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
		defaultValue: 'on',
	},
};
