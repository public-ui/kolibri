import { Icofont } from '../../icon-icofont/icofont';

const ICON_OPTIONS = [''].concat(Object.getOwnPropertyNames(Icofont));

export const argTypes = {
	_color: {
		name: 'Farbe',
		control: {
			type: 'color',
		},
	},
	_icon: {
		name: 'Icon',
		control: {
			type: 'select',
		},
		options: ICON_OPTIONS,
	},
	_iconAlign: {
		name: 'Icon-Ausrichtung',
		control: {
			type: 'select',
		},
		options: ['left', 'right'],
	},
	_iconOnly: {
		name: 'Nur Icon',
		control: {
			type: 'boolean',
			default: false,
		},
	},
	_label: {
		name: 'Label-Text',
		control: {
			type: 'text',
		},
		type: {
			required: true,
		},
	},
};
